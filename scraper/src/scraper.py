from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException, WebDriverException, TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import time
import re
from bs4 import BeautifulSoup
import urllib.parse
from config import BASE_URL
from src.utils import get_postal_code, get_timezone_info, convert_to_24h_format, get_cleaned_phone, is_internet_available
from services.business import check_business_existence, create_business
from config import sourceValues


class BusinessScraper:
    def __init__(self, logger=None):
        self.short_wait = 2
        self.medium_wait = 10
        self.long_wait = 60

        # Chrome Options
        chrome_options = Options()
        # chrome_options.add_argument("--headless")
        # chrome_options.add_argument("--disable-network")
        # chrome_options.add_argument("--force-effective-connection-type=slow-3g")
        chrome_options.add_argument("--start-maximized")
        # chrome_options.add_argument("--auto-open-devtools-for-tabs")

        try:
            logger.info("Initiating chrome web driver.")
            self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        except WebDriverException:
            logger.error("Service chromedriver unexpectedly exited.")

        self.logger = logger

    def search(self, query):
        self.logger.info(f"Searching for query: {query}")
        self.driver.get(f"{BASE_URL}/{urllib.parse.quote_plus(query)}")
        wait = WebDriverWait(self.driver, self.long_wait)
        wait.until(EC.visibility_of_any_elements_located((By.XPATH, "//div[@role='feed']")))
        wait.until(EC.visibility_of_all_elements_located((By.XPATH, "//div[@class='qBF1Pd fontHeadlineSmall ']")))

    def scroll_and_extract_data(self, query: str, location: str):
        self.logger.info("Scrolling into feed.")
        counter = 0

        try:
            feed = self.driver.find_element(By.XPATH, "//div[@role='feed']")
        except NoSuchElementException:
            return
        except StaleElementReferenceException:
            return

        print(f"{query} - while loop: \n")
        while True:
            business_anchor_tags = feed.find_elements(By.XPATH, "./child::*")
            current_business_anchor = None
            current_business_anchor_is_article_or_not = None
            current_business_anchor_is_loader_or_not = None
            current_business_anchor_is_end_of_list_or_not = None
            current_business_data = {}

            current_business_anchor = business_anchor_tags[counter]

            try:
                if current_business_anchor:
                    print(f"{query} - 1: \n")
                    current_business_anchor_is_article_or_not = current_business_anchor.find_element(By.XPATH, ".//div[contains(@class, 'Nv2PK')]//a[contains(@class, 'hfpxzc')]")
            except NoSuchElementException:
                pass
            except StaleElementReferenceException:
                pass

            try:
                if current_business_anchor:
                    print(f"{query} - 2: \n")
                    current_business_anchor_is_loader_or_not = current_business_anchor.find_element(By.XPATH, ".//div[@class='qjESne veYFef']")
            except NoSuchElementException:
                pass
            except StaleElementReferenceException:
                pass

            try:
                if current_business_anchor:
                    print(f"{query} - 3: \n")
                    current_business_anchor_is_end_of_list_or_not = current_business_anchor.find_element(By.XPATH, ".//div[@class='PbZDve ']")
            except NoSuchElementException:
                pass
            except StaleElementReferenceException:
                pass

            if feed is None:
                print(f"{query} - 4: \n")
                break
            elif len(business_anchor_tags) <= counter:
                print(f"{query} - 5: \n")
                break

            if not current_business_anchor_is_article_or_not and not current_business_anchor_is_loader_or_not and not current_business_anchor_is_end_of_list_or_not:
                print(f"{query} - 6: \n")
                counter = counter + 1
                continue
            if current_business_anchor_is_loader_or_not:
                print(f"{query} - 7: \n")
                while True:
                    try:
                        print(f"{query} - 8: \n")
                        business_anchor_tags = feed.find_elements(By.XPATH, "./child::*")
                        current_business_anchor = business_anchor_tags[counter]
                        current_business_anchor_is_loader_or_not = current_business_anchor.find_element(By.XPATH, ".//div[@class='qjESne veYFef']")
                    except NoSuchElementException:
                        break
                    except StaleElementReferenceException:
                        pass

                    if current_business_anchor_is_loader_or_not:
                        print(f"{query} - 9: \n")
                        wait = WebDriverWait(self.driver, 5)
                        try:
                            wait.until(EC.invisibility_of_element_located((By.XPATH, "//div[@class='qjESne veYFef']")))
                        except NoSuchElementException:
                            pass
                        except TimeoutException:
                            pass
                        continue
                    else:
                        break
                counter = counter + 1
                continue
            if current_business_anchor_is_end_of_list_or_not:
                print(f"{query} - 10: \n")
                counter = counter + 1
                break

            # if counter >= 5:
            #     break

            # current_business_anchor = current_business_anchor_is_article_or_not
            has_scrolled = self.driver.execute_script(
                """
                    try {
                        arguments[0].scrollIntoView(true);
                        return true;
                    } catch (error) {
                        console.error(error);
                        return false;
                    }
                """,
                current_business_anchor_is_article_or_not,
            )

            current_business_feed_heading = current_business_anchor.find_element(By.XPATH, ".//div[@class='qBF1Pd fontHeadlineSmall ']")
            current_business_anchor_card_info = current_business_anchor.find_elements(By.XPATH, ".//div[@class='UaQhfb fontBodyMedium']/div[@class='W4Efsd']/div[@class='W4Efsd']/span")
            current_business_feed_category = None
            current_business_feed_address = None
            current_business_feed_phone = None

            try:
                current_business_feed_category = current_business_anchor_card_info[0]
                current_business_feed_address = current_business_anchor_card_info[1]
                current_business_feed_phone = current_business_anchor_card_info[3]
            except IndexError:
                self.logger.warning(f"Business card has less info")
                pass

            if not current_business_feed_heading:
                self.logger.warning("Failed to find the business name on the feed.")

            if not current_business_feed_category:
                self.logger.warning("Failed to find the business category on the feed.")

            if not current_business_feed_address:
                self.logger.warning("Failed to find the business address on the feed.")

            if not current_business_feed_phone:
                self.logger.warning("Failed to find the business phone on the feed.")

            try:
                does_business_exist = check_business_existence(name=getattr(current_business_feed_heading, "text", None), category=getattr(current_business_feed_category, "text", None), address=getattr(current_business_feed_address, "text", None), phone=get_cleaned_phone(getattr(current_business_feed_phone, "text", None)), includes=["BusinessPhone"])
                self.logger.info(f"The business named '{getattr(current_business_feed_heading, 'text', None)}' exists?: {does_business_exist}")
            except Exception as e:
                self.logger.exception("An error occurred while checking business existence: %s", e)

            counter = counter + 1
            if does_business_exist:
                time.sleep(1)
                continue

            try:
                self.logger.info("About to open new business profile.")
                self.logger.info("========================================================")
                self.logger.info("================= New Business =========================")
                self.logger.info("========================================================")
                ActionChains(self.driver).move_to_element(current_business_anchor).click().perform()
                time.sleep(self.short_wait)

                # Wait for the Heading element to appear on the view
                wait = WebDriverWait(self.driver, self.long_wait)
                wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".tAiQdd")))
                wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".DUwDvf.fontHeadlineLarge")))

                soup = BeautifulSoup(self.driver.page_source, "html.parser")

                self.logger.info("~~~~~~~~ Basic Info ~~~~~~~~")
                # Heading
                h1_text = soup.find("h1", class_="DUwDvf fontHeadlineLarge").text
                current_business_data["name"] = h1_text
                self.logger.info(f"Title: {h1_text}")

                # Business Domain
                business_domain_button = soup.select_one(".fontBodyMedium button.DkEaL")
                if business_domain_button:
                    current_business_data["businessDomain"] = business_domain_button.text
                current_business_data["category"] = query

                # Wait until the URL contains the expected business name
                wait = WebDriverWait(self.driver, self.medium_wait)  # Adjust the timeout as needed
                wait.until(EC.url_contains(h1_text.split(" ")[0]))

                # Rating
                rating_text = soup.find("div", class_="F7nice").text
                if rating_text:
                    rating_result = re.findall(r"([\d.]+)", rating_text)
                    self.logger.info(f"Rating: {rating_result[0]}")
                    self.logger.info(f"Reviews: {rating_result[1]}")
                    current_business_data["rating"] = float(rating_result[0])
                    current_business_data["reviews"] = int(rating_result[1])
                else:
                    self.logger.info(f"Rating: {0}")
                    self.logger.info(f"Reviews: {0}")
                    current_business_data["rating"] = 0.0
                    current_business_data["reviews"] = 0

                self.logger.info("~~~~~~~~ Location Info ~~~~~~~~")
                # Extract latitude and longitude from the URL
                lat_lon = self.driver.current_url.split("/")[6].split("@")[1].split(",")[:2]
                latitude = float(lat_lon[0])
                longitude = float(lat_lon[1])
                current_business_data["latitude"] = latitude
                current_business_data["longitude"] = longitude
                self.logger.info(f"Latitude & Longitude: {latitude}, {longitude}")

                current_business_data["source"] = sourceValues[0]
                self.logger.info(f"Source: {sourceValues[0]}")

                self.logger.info("~~~~~~~~ Timezone Info ~~~~~~~~")
                timezone = get_timezone_info(location["timezone"])
                self.logger.info(f"Timezone: {location['timezone']}")
                self.logger.info(f"UTC Offset: {timezone['utc_offset']}")
                self.logger.info(f"DST: {timezone['dst']}")
                self.logger.info(f"DST Offset: {timezone['dst_offset']}")
                self.logger.info(f"Country Code: {location['countryCode']}")

                current_business_data["timezone"] = {
                    "timezoneName": location["timezone"],
                    "utcOffset": timezone["utc_offset"],
                    "dst": timezone["dst"],
                    "dstOffset": timezone["dst_offset"],
                    "countryCode": location["countryCode"],
                }

                merged_elements = self.driver.find_elements(By.CLASS_NAME, "RcCsl") + self.driver.find_elements(By.CLASS_NAME, "OqCZI")
                html_sources = [element.get_attribute("innerHTML") for element in merged_elements]
                soup_elements = [BeautifulSoup(html, "html.parser") for html in html_sources]

                for info in soup_elements:
                    img_with_place_src = info.find("img", {"src": lambda s: "place_gm" in s})
                    img_with_schedule_src = info.find("img", {"src": lambda s: "schedule" in s})
                    img_with_shipping_src = info.find("img", {"src": lambda s: "shipping" in s})
                    img_with_public_src = info.find("img", {"src": lambda s: "public" in s})
                    img_with_phone_src = info.find("img", {"src": lambda s: "phone" in s})
                    img_with_plus_code_src = info.find("img", {"src": lambda s: "plus_code" in s})
                    img_with_send_to_mobile_src = info.find("img", {"src": lambda s: "send_to_mobile" in s})

                    if img_with_place_src:
                        self.logger.info("~~~~~~~~ Address Info ~~~~~~~~")
                        tr_text = info.get_text("|", strip=True)
                        current_business_data["address"] = tr_text
                        self.logger.info(f"Place: {tr_text}")
                        zip = get_postal_code(address=tr_text)
                        self.logger.info("Location:")
                        self.logger.info(f"Postal Code: {zip}")
                        self.logger.info(f"City: {location['city']}")
                        self.logger.info(f"State: {location['state']}")
                        self.logger.info(f"Country: {location['country']}")
                        current_business_data["postalCode"] = zip
                        current_business_data["location"] = {
                            "city": location["city"],
                            "state": location["state"],
                            "country": location["country"],
                        }
                    elif img_with_schedule_src:
                        self.logger.info("~~~~~~~~ Schedule Info ~~~~~~~~")
                        tr_elements = soup.find_all("tr", class_="y0skZc")

                        for tr in tr_elements:
                            td_elements = tr.find_all("td")

                            if len(td_elements) >= 2:
                                first_td_text = td_elements[0].text.strip()
                                second_td_text = td_elements[1].text.strip()
                                string = td_elements[1].text.replace("\u202f", "")  # Remove space
                                string = string.replace("–", "-")  # Replace non-standard hyphen with regular hyphen
                                result = string.split("-")
                                if "Mon" in first_td_text or "Tue" in first_td_text or "Wed" in first_td_text:
                                    try:
                                        current_business_data["openingHour"] = convert_to_24h_format(result[0])
                                        current_business_data["closingHour"] = convert_to_24h_format(result[1])
                                    except IndexError:
                                        self.logger.warning(f"Open/Close Hours: {result}")
                                        pass
                                self.logger.info(f"{first_td_text}: {second_td_text}")
                    elif img_with_shipping_src:
                        tr_text = info.get_text("|", strip=True)
                        self.logger.info(f"Shipping: {tr_text}")
                    elif img_with_public_src:
                        tr_text = info.get_text("|", strip=True)
                        current_business_data["website"] = tr_text
                        self.logger.info(f"Website: {tr_text}")
                    elif img_with_phone_src:
                        tr_text = info.get_text("|", strip=True)
                        current_business_data["phone"] = get_cleaned_phone(phone=tr_text)
                        self.logger.info(f"Phone: {tr_text}")
                    elif img_with_plus_code_src:
                        tr_text = info.get_text("|", strip=True)
                        self.logger.info(f"Plus Code: {tr_text}")
                    elif img_with_send_to_mobile_src:
                        tr_text = info.get_text("|", strip=True)
                        self.logger.info(f"Send To Mobile: {tr_text}")
                    else:
                        self.logger.info(f"Other: {info.find('img')} {info.get_text('|', strip=True)}")

                if has_scrolled:
                    time.sleep(self.short_wait)
                    close_current_business_anchor = self.driver.find_element(By.XPATH, ".//div[@class='m6QErb WNBkOb '][@role='main']//button[@aria-label='Close']")
                    close_current_business_anchor.click()

                create_business(current_business_data)
                self.logger.info("~~~~~~~~~~~~~~~~~ Scrolling ~~~~~~~~~~~~~~~~~~~~~~~~~")
            except Exception as e:
                self.logger.exception("An error occurred while scrolling and extracting data: %s", e)

    def close(self):
        self.driver.quit()
