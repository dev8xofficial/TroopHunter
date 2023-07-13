from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import WebDriverException
import time
import re
import json
from bs4 import BeautifulSoup
import csv
import urllib
from config import BASE_URL
import logging
import urllib.parse
from src.utils import get_postal_code, get_timezone_info, convert_to_24h_format
from services.business import check_business_existence, create_business
from config import sourceValues

# from geopy.geocoders import Nominatim

# geolocator = Nominatim(user_agent="my_app")


class BusinessScraper:
    def __init__(self):
        chrome_options = Options()
        # chrome_options.add_argument("--headless")
        # chrome_options.add_argument("--disable-network")
        # chrome_options.add_argument("--force-effective-connection-type=slow-3g")
        chrome_options.add_argument("--start-maximized")
        # chrome_options.add_argument("--auto-open-devtools-for-tabs")

        try:
            logging.info("Initiating chrome web driver.")
            self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        except WebDriverException:
            logging.error("Service chromedriver unexpectedly exited.")

    def search(self, query):
        logging.info(f"Searching for query: {query}")
        self.driver.get(f"{BASE_URL}/{urllib.parse.quote_plus(query)}")

    def scroll_and_extract_data(self, query: str, location: str):
        logging.info("Scrolling into feed.")
        counter = 0
        short_wait = 2
        medium_wait = 10
        long_wait = 60

        try:
            feed = self.driver.find_element(By.XPATH, "//div[@role='feed']")
        except NoSuchElementException:
            return
        except StaleElementReferenceException:
            return

        while True:
            business_anchor_tags = feed.find_elements(By.XPATH, "./child::*")
            current_business_anchor = business_anchor_tags[counter]
            current_business_anchor_is_article_or_not = None
            current_business_anchor_is_loader_or_not = None
            current_business_anchor_is_end_of_list_or_not = None
            current_business_data = {}
            logging.info("Selected new business.")

            try:
                if current_business_anchor:
                    current_business_anchor_is_article_or_not = current_business_anchor.find_element(By.XPATH, ".//div[@role='article']//a[@class='hfpxzc']")
            except NoSuchElementException:
                pass
            except StaleElementReferenceException:
                pass

            try:
                if current_business_anchor:
                    current_business_anchor_is_loader_or_not = current_business_anchor.find_element(By.XPATH, ".//div[@class='qjESne veYFef']")
            except NoSuchElementException:
                pass
            except StaleElementReferenceException:
                pass

            try:
                if current_business_anchor:
                    current_business_anchor_is_end_of_list_or_not = current_business_anchor.find_element(By.XPATH, ".//div[@class='PbZDve ']")
            except NoSuchElementException:
                pass
            except StaleElementReferenceException:
                pass

            if feed is None:
                break
            elif len(business_anchor_tags) <= counter:
                break

            if not current_business_anchor_is_article_or_not and not current_business_anchor_is_loader_or_not and not current_business_anchor_is_end_of_list_or_not:
                counter = counter + 1
                continue
            if current_business_anchor_is_loader_or_not:
                while True:
                    try:
                        business_anchor_tags = feed.find_elements(By.XPATH, "./child::*")
                        current_business_anchor = business_anchor_tags[counter]
                        current_business_anchor_is_loader_or_not = current_business_anchor.find_element(By.XPATH, ".//div[@class='qjESne veYFef']")
                    except NoSuchElementException:
                        break
                    except StaleElementReferenceException:
                        pass

                    if current_business_anchor_is_loader_or_not:
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
                counter = counter + 1
                break

            # if counter >= 5:
            #     break

            current_business_anchor = current_business_anchor_is_article_or_not
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
                current_business_anchor,
            )

            logging.info("About to open new business profile .")
            logging.info("========================================================")
            logging.info("================= New Business =========================")
            logging.info("========================================================")
            ActionChains(self.driver).move_to_element(current_business_anchor).click().perform()
            counter = counter + 1
            time.sleep(short_wait)

            # Wait for the Heading element to appear on the view
            wait = WebDriverWait(self.driver, long_wait)
            wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".tAiQdd")))
            wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".DUwDvf.fontHeadlineLarge")))

            soup = BeautifulSoup(self.driver.page_source, "html.parser")

            logging.info("~~~~~~~~ Basic Info ~~~~~~~~")
            # Heading
            h1_text = soup.find("h1", class_="DUwDvf fontHeadlineLarge").text
            current_business_data["name"] = h1_text
            logging.info(f"Title: {h1_text}")

            # Business Domain
            business_domain_button = soup.select_one(".fontBodyMedium button.DkEaL")
            if business_domain_button:
                current_business_data["businessDomain"] = business_domain_button.text
            current_business_data["category"] = query

            # Wait until the URL contains the expected business name
            wait = WebDriverWait(self.driver, medium_wait)  # Adjust the timeout as needed
            wait.until(EC.url_contains(h1_text.split(" ")[0]))

            # Rating
            rating_text = soup.find("div", class_="F7nice").text
            if rating_text:
                rating_result = re.findall(r"([\d.]+)", rating_text)
                logging.info(f"Rating: {rating_result[0]}")
                logging.info(f"Reviews: {rating_result[1]}")
                current_business_data["rating"] = float(rating_result[0])
                current_business_data["reviews"] = int(rating_result[1])
            else:
                logging.info(f"Rating: {0}")
                logging.info(f"Reviews: {0}")
                current_business_data["rating"] = 0.0
                current_business_data["reviews"] = 0

            logging.info("~~~~~~~~ Location Info ~~~~~~~~")
            # Extract latitude and longitude from the URL
            lat_lon = self.driver.current_url.split("/")[6].split("@")[1].split(",")[:2]
            latitude = float(lat_lon[0])
            longitude = float(lat_lon[1])
            current_business_data["latitude"] = latitude
            current_business_data["longitude"] = longitude
            logging.info(f"Latitude & Longitude: {latitude}, {longitude}")

            current_business_data["source"] = sourceValues[0]
            logging.info(f"Source: {sourceValues[0]}")

            logging.info("~~~~~~~~ Timezone Info ~~~~~~~~")
            timezone = get_timezone_info(location["timezone"])
            logging.info(f"Timezone: {location['timezone']}")
            logging.info(f"UTC Offset: {timezone['utc_offset']}")
            logging.info(f"DST: {timezone['dst']}")
            logging.info(f"DST Offset: {timezone['dst_offset']}")
            logging.info(f"Country Code: {location['countryCode']}")

            current_business_data["timezone"] = {
                "timezoneName": location["timezone"],
                "utcOffset": timezone["utc_offset"],
                "dst": timezone["dst"],
                "dstOffset": timezone["dst_offset"],
                "countryCode": location["countryCode"],
            }

            # if not is_business_existence:
            #     location = get_location_details(latitude=latitude, longitude=longitude)
            #     logging.info("Location:")
            #     logging.info(f"Postal Code: {location['postal_code']}")
            #     logging.info(f"City: {location['city']}")
            #     logging.info(f"State: {location['state']}")
            #     logging.info(f"Country: {location['country']}")

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
                    logging.info("~~~~~~~~ Address Info ~~~~~~~~")
                    tr_text = info.get_text("|", strip=True)
                    current_business_data["address"] = tr_text
                    logging.info(f"Place: {tr_text}")
                    # if not is_business_existence:
                    zip = get_postal_code(address=tr_text)
                    logging.info("Location:")
                    logging.info(f"Postal Code: {zip}")
                    logging.info(f"City: {location['city']}")
                    logging.info(f"State: {location['state']}")
                    logging.info(f"Country: {location['country']}")
                    current_business_data["postalCode"] = zip
                    current_business_data["location"] = {
                        "city": location["city"],
                        "state": location["state"],
                        "country": location["country"],
                    }
                elif img_with_schedule_src:
                    logging.info("~~~~~~~~ Schedule Info ~~~~~~~~")
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
                                current_business_data["openingHour"] = convert_to_24h_format(result[0])
                                current_business_data["closingHour"] = convert_to_24h_format(result[1])
                            logging.info(f"{first_td_text}: {second_td_text}")
                elif img_with_shipping_src:
                    tr_text = info.get_text("|", strip=True)
                    logging.info(f"Shipping: {tr_text}")
                elif img_with_public_src:
                    tr_text = info.get_text("|", strip=True)
                    current_business_data["website"] = tr_text
                    logging.info(f"Website: {tr_text}")
                elif img_with_phone_src:
                    tr_text = info.get_text("|", strip=True)
                    current_business_data["phone"] = tr_text
                    logging.info(f"Phone: {tr_text}")
                elif img_with_plus_code_src:
                    tr_text = info.get_text("|", strip=True)
                    logging.info(f"Plus Code: {tr_text}")
                elif img_with_send_to_mobile_src:
                    tr_text = info.get_text("|", strip=True)
                    logging.info(f"Send To Mobile: {tr_text}")
                else:
                    logging.info(f"Other: {info.find('img')} {info.get_text('|', strip=True)}")

            if has_scrolled:
                time.sleep(short_wait)
                close_current_business_anchor = self.driver.find_element(By.XPATH, ".//div[@class='m6QErb WNBkOb '][@role='main']//button[@aria-label='Close']")
                close_current_business_anchor.click()

            is_business_existence = check_business_existence(current_business_data["address"])
            logging.info(f"Does the business exist?: {not is_business_existence}")
            logging.info("~~~~~~~ Scrolling ~~~~~~~")
            if is_business_existence:
                # time.sleep(short_wait)
                continue
            else:
                create_business(current_business_data)

    def save_to_csv(self, data, output_file):
        with open(output_file, "w", newline="", encoding="utf-8") as csv_file:
            writer = csv.writer(csv_file)

    def close(self):
        self.driver.quit()
