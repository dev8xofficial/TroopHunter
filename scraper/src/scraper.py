from seleniumwire import webdriver
from seleniumwire.utils import decode
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException, WebDriverException, TimeoutException
from selenium.webdriver.chrome.options import Options
import time
import re
from bs4 import BeautifulSoup
from urllib.parse import quote_plus
from config import BASE_URL
from dotenv import load_dotenv
import os
import json

from src.utils.location import get_postal_code, get_timezone_info, extract_lat_lon
from src.utils.business import convert_to_24h_format, get_cleaned_phone, click_feed_article, close_feed_article, wait_for_url
from src.utils.general import handle_timeout_with_retry
from src.services.business import check_business_existence, create_business
from src.services.state import get_states
from src.services.country import get_countries
from config import sourceValues

# Load environment variables from .env file
load_dotenv()


class BusinessScraper:
    def __init__(self, searchQuery=None, logger=None):
        self.short_wait = 2
        self.medium_wait = 10
        self.long_wait = 60

        chrome_driver_path = os.environ.get("PROJECT_PATH")
        # Chrome Options
        chrome_options = Options()
        # chrome_options.add_argument("--headless")
        # chrome_options.add_argument("--disable-network")
        # chrome_options.add_argument("--force-effective-connection-type=slow-3g")
        chrome_options.add_argument("--start-maximized")
        # chrome_options.add_argument("--auto-open-devtools-for-tabs")

        try:
            logger.info("Initiating chrome web driver.")
            self.driver = webdriver.Chrome(options=chrome_options)
        except Exception as e:
            logger.error("Service chromedriver unexpectedly exited: ", e)

        self.logger = logger
        self.searchQuery = searchQuery

    def search(self, query):
        self.logger.info(f"Searching for query: {query}")
        self.driver.get(f"{BASE_URL}/{quote_plus(query)}")
        wait = WebDriverWait(self.driver, self.long_wait)
        wait.until(EC.visibility_of_any_elements_located((By.XPATH, "//div[@role='feed']")))
        wait.until(EC.visibility_of_all_elements_located((By.XPATH, "//div[@class='qBF1Pd fontHeadlineSmall ']")))

    def scroll_and_extract_data(self, query: str, city: str):
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
                does_business_exist = check_business_existence(name=getattr(current_business_feed_heading, "text", None), category=getattr(current_business_feed_category, "text", None), address=getattr(current_business_feed_address, "text", None), phone=get_cleaned_phone(getattr(current_business_feed_phone, "text", None)), include=["BusinessPhone"])
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

                handle_timeout_with_retry(dynamic_code_for_try=lambda: click_feed_article(self=self, current_business_anchor=current_business_anchor), dynamic_code_for_catch=lambda: close_feed_article(self=self), self=self, logger=self.logger)

                soup = BeautifulSoup(self.driver.page_source, "html.parser")

                self.logger.info("~~~~~~~~ Basic Info ~~~~~~~~")
                # Heading
                h1_text = soup.find("h1", class_="DUwDvf").text
                current_business_data["name"] = h1_text
                self.logger.info(f"Title: {h1_text}")

                # Business Domain
                business_domain_button = soup.select_one(".fontBodyMedium button.DkEaL")
                if business_domain_button:
                    current_business_data["businessDomain"] = business_domain_button.text.lower()
                current_business_data["category"] = query

                try:
                    # Find the element by its CSS selector
                    element = current_business_anchor.find_element(By.XPATH, ".//div[@class='hHbUWd']//h1")
                    text = element.text
                    if "sponsor" in text.lower():
                        current_business_data["sponsoredAd"] = True
                except NoSuchElementException as e:
                    pass

                handle_timeout_with_retry(dynamic_code_for_try=lambda: wait_for_url(self=self, h1_text=h1_text), logger=self.logger)

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

                latitude, longitude = extract_lat_lon(city, self.driver.current_url)
                current_business_data["latitude"] = latitude
                current_business_data["longitude"] = longitude
                self.logger.info(f"Latitude & Longitude: {latitude}, {longitude}")

                current_business_data["source"] = sourceValues[0]
                self.logger.info(f"Source: {sourceValues[0]}")

                # self.logger.info("~~~~~~~~ Timezone Info ~~~~~~~~")
                # timezone = get_timezone_info(city["timezone"])
                # self.logger.info(f"Timezone: {city['timezone']}")
                # self.logger.info(f"UTC Offset: {timezone['utc_offset']}")
                # self.logger.info(f"DST: {timezone['dst']}")
                # self.logger.info(f"DST Offset: {timezone['dst_offset']}")
                # self.logger.info(f"Country Code: {city['countryCode']}")

                # current_business_data["timezone"] = {
                #     "timezoneName": city["timezone"],
                #     "utcOffset": timezone["utc_offset"],
                #     "dst": timezone["dst"],
                #     "dstOffset": timezone["dst_offset"],
                #     "countryCode": city["countryCode"],
                # }

                merged_elements = self.driver.find_elements(By.CLASS_NAME, "RcCsl") + self.driver.find_elements(By.CLASS_NAME, "OqCZI")
                html_sources = [element.get_attribute("innerHTML") for element in merged_elements]
                soup_elements = [BeautifulSoup(html, "html.parser") for html in html_sources]

                for info in soup_elements:
                    # img_with_place_src = info.find("button", {"data-tooltip": lambda s: "Copy address" in s})
                    # img_with_schedule_src = info.find("img", {"src": lambda s: "schedule" in s})
                    # img_with_shipping_src = info.find("img", {"src": lambda s: "shipping" in s})
                    # img_with_public_src = info.find("a", {"data-tooltip": lambda s: "Open website" in s})
                    # img_with_phone_src = info.find("button", {"data-tooltip": lambda s: "Copy phone number" in s})
                    # img_with_plus_code_src = info.find("button", {"data-tooltip": lambda s: "Copy plus code" in s})
                    # img_with_send_to_mobile_src = info.find("button", {"aria-label": lambda s: "Send to your phone" in s})

                    try:
                        if info.find("button", {"data-tooltip": lambda s: "Copy address" in s}):
                            self.logger.info("~~~~~~~~ Address Info ~~~~~~~~")
                            tr_text = info.find("button", {"data-tooltip": lambda s: "Copy address" in s}).get_text("|", strip=True).replace("\ue0c8|", "").replace("\ue14d", "").replace("\ue88e", "")
                            current_business_data["address"] = tr_text
                            self.logger.info(f"Place: {tr_text}")
                            zip = get_postal_code(address=tr_text)
                            self.logger.info("Location:")
                            self.logger.info(f"Postal Code: {zip}")
                            state = get_states(code=city['stateCode'], country_code=city['countryCode'])['states'][0]
                            country = get_countries(code=city['countryCode'])['countries'][0]
                            self.logger.info(f"CityId: {city['id']}")
                            self.logger.info(f"StateId: {state['id']}")
                            self.logger.info(f"CountryId: {country['id']}")
                            current_business_data["postalCode"] = zip
                            current_business_data["cityId"] = city['id']
                            current_business_data["stateId"] = state['id']
                            current_business_data["countryId"] = country['id']
                        elif info.find("table", class_="fontBodyMedium"):
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
                                    if "Mon" in first_td_text or "Tue" in first_td_text or "Wed" in first_td_text or "Thu" in first_td_text or "Fri" in first_td_text or "Sat" in first_td_text or "Sun" in first_td_text:
                                        try:
                                            current_business_data["openingHour"] = convert_to_24h_format(result[0])
                                            current_business_data["closingHour"] = convert_to_24h_format(result[1])
                                        except IndexError:
                                            self.logger.warning(f"Open/Close Hours: {result}")
                                            pass
                                    self.logger.info(f"{first_td_text}: {second_td_text}")
                        elif info.find("img", {"src": lambda s: "shipping" in s}):
                            tr_text = info.get_text("|", strip=True)
                            self.logger.info(f"Shipping: {tr_text}")
                        elif info.find("a", {"data-tooltip": lambda s: "Open website" in s}):
                            tr_text = info.find("a", {"data-tooltip": lambda s: "Open website" in s}).get_text("|", strip=True).replace("\ue80b|", "").replace("\ue89e", "").replace("\ue14d", "")
                            current_business_data["website"] = tr_text
                            self.logger.info(f"Website: {tr_text}")
                        elif info.find("button", {"data-tooltip": lambda s: "Copy phone number" in s}):
                            tr_text = info.find("button", {"data-tooltip": lambda s: "Copy phone number" in s}).get_text("|", strip=True).replace("\ue0b0|", "").replace("\ue14d", "").replace("\ue0b0", "")
                            current_business_data["phone"] = get_cleaned_phone(phone=tr_text)
                            self.logger.info(f"Phone: {tr_text}")
                        elif info.find("button", {"data-tooltip": lambda s: "Copy plus code" in s}):
                            tr_text = info.find("button", {"data-tooltip": lambda s: "Copy plus code" in s}).get_text("|", strip=True).replace("\uf186|", "").replace("\ue14d", "").replace("\ue88e", "")
                            self.logger.info(f"Plus Code: {tr_text}")
                        elif info.find("button", {"aria-label": lambda s: "Send to your phone" in s}):
                            tr_text = info.get_text("|", strip=True)
                            self.logger.info(f"Send To Mobile: {tr_text}")
                        else:
                            self.logger.info(f"Other: {info.find('img')} {info.get_text('|', strip=True)}")

                    except Exception:
                        self.logger.info("An error occurred while searching business information:")

                if has_scrolled:
                    time.sleep(self.short_wait)
                    try:
                        close_feed_article(self=self)
                    except NoSuchElementException as e:
                        self.logger.error("close_feed_article - No such element found")
                        pass

                create_business(current_business_data)
                self.logger.info("~~~~~~~~~~~~~~~~~ Scrolling ~~~~~~~~~~~~~~~~~~~~~~~~~")
            except Exception as e:
                self.logger.exception("An error occurred while scrolling and extracting data: %s", e)
    
    def parse_network_traffic(self, target_url):
        for request in self.driver.requests:                        
            if target_url in request.url:
                data = decode(request.response.body, request.response.headers.get('Content-Encoding', 'identity'))
                data = data.decode("utf8")
                data = json.loads(data.lstrip(")]}'\n").rstrip(','))
                return data

    def scroll_and_parse_data(self, query: str, city: str):
        data = self.driver.execute_script("return window.APP_INITIALIZATION_STATE")
        data = json.loads(data[3][2].lstrip(")]}'\n").rstrip(','))

        current_business_data = {}

        #Parse place endpoint data
        # data = self.parse_network_traffic("https://www.google.com/maps/preview/place")

        counter = 1
        while True:
            try:
                current_business_maps_data = data[0][1][counter][14]
                
                #Heading
                self.logger.info("~~~~~~~~ Basic Info ~~~~~~~~")
                # soup = BeautifulSoup(self.driver.page_source, "html.parser")
                # h1_text = soup.find("h1", class_="DUwDvf").text
                current_business_data["name"] = current_business_maps_data[11]
                self.logger.info(f"Title: {current_business_maps_data[11]}")
                current_business_data["businessDomain"] = current_business_maps_data[13][0]
                current_business_data["category"] = query
                # try:
                #     # Find the element by its CSS selector
                #     element = current_business_anchor.find_element(By.XPATH, ".//div[@class='hHbUWd']//h1")
                #     text = element.text
                #     if "sponsor" in text.lower():
                #         current_business_data["sponsoredAd"] = True
                # except NoSuchElementException as e:
                #     pass

                # handle_timeout_with_retry(dynamic_code_for_try=lambda: wait_for_url(self=self, h1_text=h1_text), logger=self.logger)

                # Rating
                if current_business_maps_data[4]:
                    rating_result = current_business_maps_data[4]
                    self.logger.info(f"Rating: {rating_result[7]}")
                    self.logger.info(f"Reviews: {rating_result[8]}")
                    current_business_data["rating"] = float(rating_result[7])
                    current_business_data["reviews"] = int(rating_result[8])
                else:
                    self.logger.info(f"Rating: {0.0}")
                    self.logger.info(f"Reviews: {0}")
                    current_business_data["rating"] = 0.0
                    current_business_data["reviews"] = 0

                #Latitude & Longitude
                self.logger.info("~~~~~~~~ Location Info ~~~~~~~~")
                lat_and_long = current_business_maps_data[9]
                current_business_data["latitude"] = lat_and_long[2]
                current_business_data["longitude"] = lat_and_long[3]
                self.logger.info(f"Latitude & Longitude: {lat_and_long[2]}, {lat_and_long[3]}")

                #Source
                current_business_data["source"] = sourceValues[0]
                self.logger.info(f"Source: {sourceValues[0]}")

                #Timezone
                self.logger.info("~~~~~~~~ Timezone Info ~~~~~~~~")
                timezone = get_timezone_info(current_business_maps_data[30])
                self.logger.info(f"Timezone: {current_business_maps_data[30]}")
                self.logger.info(f"UTC Offset: {timezone['utc_offset']}")
                self.logger.info(f"DST: {timezone['dst']}")
                self.logger.info(f"DST Offset: {timezone['dst_offset']}")
                self.logger.info(f"Country Code: {city['countryCode']}")
                current_business_data["timezone"] = {
                    "timezoneName": current_business_maps_data[30],
                    "utcOffset": timezone["utc_offset"],
                    "dst": timezone["dst"],
                    "dstOffset": timezone["dst_offset"],
                    "countryCode": city["countryCode"],
                }

                #Address Info
                self.logger.info("~~~~~~~~ Address Info ~~~~~~~~")
                current_business_address = ", ".join(current_business_maps_data[2])
                current_business_data["address"] = current_business_address
                self.logger.info(f"Place: {current_business_address}")
                zip = get_postal_code(address=current_business_maps_data[2][1])
                self.logger.info(f"Postal Code: {zip}")
                state = get_states(code=city['stateCode'], country_code=city['countryCode'])['states'][0]
                country = get_countries(code=city['countryCode'])['countries'][0]
                current_business_data["postalCode"] = zip
                current_business_data["cityId"] = city['id']
                current_business_data["stateId"] = state['id']
                current_business_data["countryId"] = country['id']
                self.logger.info(f"CityId: {city['id']}")
                self.logger.info(f"StateId: {state['id']}")
                self.logger.info(f"CountryId: {country['id']}")

                #Schedule Info
                self.logger.info("~~~~~~~~ Schedule Info ~~~~~~~~")
                current_business_schedule = current_business_maps_data[34]
                open_hour = current_business_schedule[1][0][1][0].replace("\u202f", "").split("–")[0]
                close_hour = current_business_schedule[1][0][1][0].replace("\u202f", "").split("–")[1]
                current_business_data["openingHour"] = convert_to_24h_format(open_hour)
                current_business_data["closingHour"] = convert_to_24h_format(close_hour)
                self.logger.info(f"Open Hours: {open_hour}")
                self.logger.info(f"Close Hours: {close_hour}")

                #Website
                current_business_data["website"] = current_business_maps_data[7][1]
                self.logger.info(f"Website: {current_business_maps_data[7][1]}")

                #Phone
                current_business_data["phone"] = current_business_maps_data[178][0][3]
                self.logger.info(f"Phone: {current_business_maps_data[178][0][3]}")
            except Exception:
                self.logger.info("An error occurred while searching business information:")
            
            counter = counter + 1
            if counter >= len(data[0][1]):
                break

    def close(self):
        self.driver.quit()
