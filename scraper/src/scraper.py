from seleniumwire import webdriver
from seleniumwire.utils import decode
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException, WebDriverException, TimeoutException, NoSuchWindowException
from selenium.webdriver.chrome.options import Options
import time
import re
from bs4 import BeautifulSoup
from urllib.parse import quote_plus
from config import BASE_URL
from dotenv import load_dotenv
import os
import random
from datetime import datetime
import json
import urllib.parse

from src.utils.location import get_postal_code, get_timezone_info, extract_lat_lon
from src.utils.business import convert_to_24h_format, get_cleaned_phone, click_feed_article, close_feed_article, wait_for_url
from src.utils.general import handle_timeout_with_retry
from src.services.business import check_business_existence, create_business, create_businesses
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
        chrome_options.add_argument("--enable-gpu")
        chrome_options.add_argument("--disable-notifications")
        # Randomize user agent
        user_agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.54",
            "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0",
            "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0",
            "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:42.0) Gecko/20100101 Firefox/42.0"
        ]
        chrome_options.add_argument(f"user-agent={random.choice(user_agents)}")
        # chrome_options.add_argument("--auto-open-devtools-for-tabs")

        try:
            # logger.info("Initiating chrome web driver.")
            print("Initiating chrome web driver.")
            self.driver = webdriver.Chrome(options=chrome_options)
        except Exception as e:
            # logger.error("Service chromedriver unexpectedly exited: ", e)
            print("Service chromedriver unexpectedly exited: ", e)

        self.logger = logger
        self.searchQuery = searchQuery

    def ensure_driver_is_open(self, driver):
        try:
            # Attempt to perform a simple action to check if the driver is still active
            driver.title  # Access the title to see if the session is active
        except (WebDriverException, NoSuchWindowException) as e:
            # Driver is closed; reinitialize it
            print("Driver has been closed. Reinitializing...")
            driver = self.reinitialize_driver(driver)
        return driver

    def reinitialize_driver(self, existing_driver):
        # Close the existing driver if it's partially open
        try:
            existing_driver.quit()
        except:
            pass  # Ignore any errors during closure

        # Create a new instance of the driver
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--enable-gpu")
        chrome_options.add_argument("--disable-notifications")

        try:
            # logger.info("Initiating chrome web driver.")
            print("Initiating chrome web driver.")
            self.driver = webdriver.Chrome(options=chrome_options)
        except Exception as e:
            # logger.error("Service chromedriver unexpectedly exited: ", e)
            print("Service chromedriver unexpectedly exited: ", e)

    def set_logger(self, logger):
        try:
            self.logger = logger
        except Exception as e:
            self.logger.error("Something went wrong in set_logger(): {e}")

    def set_search_query(self, searchQuery):
        try:
            self.searchQuery = searchQuery
        except Exception as e:
            self.logger.error("Something went wrong in set_search_query(): {e}")

    def search(self, query):
        try:
            original_window = self.driver.current_window_handle
            self.driver.execute_script("window.open('');")
            new_tab = self.driver.window_handles[-1]
            self.driver.switch_to.window(new_tab)
            
            self.logger.info(f"Searching for query: {query}")
            self.driver.get(f"{BASE_URL}/{quote_plus(query)}")
            wait = WebDriverWait(self.driver, self.long_wait)

            if len(self.driver.window_handles) > 1:
                self.driver.switch_to.window(original_window)
                self.driver.close()

            self.driver.switch_to.window(self.driver.window_handles[-1])
            try:
                wait.until(EC.visibility_of_any_elements_located((By.XPATH, "//div[@role='feed']")))
                wait.until(EC.visibility_of_all_elements_located((By.XPATH, "//div[@class='qBF1Pd fontHeadlineSmall ']")))
            except TimeoutException:
                self.logger.warning("'feed' TimeoutException: 1. Continuing to the next step.")
            except Exception as e:
                self.logger.error("'feed' Exception: 1. Continuing to the next step. {e}")
        except Exception as e:
            self.logger.error("Something went wrong in search(): {e}")

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
        combined_data = []
        encoded_text = urllib.parse.quote(self.searchQuery)
        for request in self.driver.requests:                        
            if target_url in request.url and encoded_text in request.url:
                data = decode(request.response.body, request.response.headers.get('Content-Encoding', 'identity'))
                data = data.decode("utf8")
                if "/place" in target_url:
                    data = json.loads(data.lstrip(")]}'\n").rstrip(','))
                elif "/search" in target_url:
                    data = json.loads(json.loads(data.replace('/*""*/', ""))['d'].lstrip(")]}'\n").rstrip(','))
                    combined_data = combined_data + data[0][1][1:]
        return combined_data

    def sanitize_search_query(self, query):
        """Sanitize the search query to avoid special characters and overly long filenames."""
        return ''.join(e for e in query if e.isalnum() or e in ['-', '_']).strip()

    def save_data_to_file(self, logger, city_name, stateCode, countryCode, lat, long, new_data, queue):
        """Save API response to a file or merge with existing data, and track place_ids to avoid duplication"""

        logger.info("Starting to save data for city: %s", city_name)

        # Get the directory of the current script
        script_directory = os.path.dirname(os.path.realpath(__file__))

        # Move one directory back
        parent_directory = os.path.dirname(script_directory)

        # Define the folder path based on the new structure
        # Date (YYYY-MM-DD)
        current_date = datetime.now().strftime('%Y-%m-%d')
        date_folder = os.path.join(parent_directory, "places", current_date)

        # StateCode-CountryCode folder
        state_country_folder = os.path.join(date_folder, f"{stateCode}-{countryCode}")

        # City-Lat-Long folder
        city_folder = os.path.join(state_country_folder, f"{city_name}-{lat}-{long}")

        # Sanitize the search query to use it as part of the filename
        search_query = self.sanitize_search_query(queue)

        # Final file path: {queue}.json inside the city folder
        file_name = f"{search_query}.json"
        file_path = os.path.join(city_folder, file_name)

        logger.info("File path for saving data: %s", file_path)

        # Create the necessary directories if they don't exist
        if not os.path.exists(city_folder):
            os.makedirs(city_folder)
            logger.info("Created directory: %s", city_folder)
        else:
            logger.info("Directory already exists: %s", city_folder)

        # Initialize the data structure
        data = {"results": [], "place_ids": [], "results_length": 0}

        # If the file exists, read the existing data and merge
        if os.path.exists(file_path):
            logger.info("File exists. Reading existing data from: %s", file_path)
            with open(file_path, "r") as file:
                existing_data = json.load(file)
                data["results"] = existing_data.get("results", [])
                data["place_ids"] = existing_data.get("place_ids", [])
                logger.info("Loaded %d existing results and %d place_ids.", len(data["results"]), len(data["place_ids"]))
        else:
            logger.info("File does not exist. Will create a new one.")

        # Extract place_ids from new_data
        new_places = []
        for place in new_data.get("results", []):
            place_id = place.get("place_id")

            # Only add places that are not already in place_ids
            if place_id not in data["place_ids"]:
                new_places.append(place)
                data["place_ids"].append(place_id)  # Track the new place_id

        logger.info("Found %d new places to add.", len(new_places))

        # Add new places to results
        data["results"].extend(new_places)

        # Update the results_length field with the new length of the results array
        data["results_length"] = len(data["results"])

        # Write merged or new data to file
        with open(file_path, "w") as file:
            json.dump(data, file, indent=2)
            logger.info("Saved %d total results to file: %s", data["results_length"], file_path)

        logger.info("Data saving process completed for city: %s", city_name)

    def scroll_and_parse_data(self, query: str, city: str):
        def scroll_till_the_end_of_list(self, query: str, city: str):
            self.logger.info("Scrolling into feed.")
            counter = 0

            try:
                feed = self.driver.find_element(By.XPATH, "//div[@role='feed']")
            except NoSuchElementException:
                self.logger.warning("'feed' TimeoutException: 2. Continuing to the next step.")
                return
            except StaleElementReferenceException:
                self.logger.warning("'feed' TimeoutException: 2. Continuing to the next step.")
                return
            except TimeoutException:
                self.logger.warning("'feed' TimeoutException: 2. Continuing to the next step.")
            except Exception as e:
                self.logger.error("'feed' Exception: 2. Continuing to the next step. {e}")

            print(f"{query} - while loop: \n")
            while True:
                business_anchor_tags = feed.find_elements(By.XPATH, "./child::*")
                current_business_anchor = None
                current_business_anchor_is_article_or_not = None
                current_business_anchor_is_loader_or_not = None
                current_business_anchor_is_end_of_list_or_not = None

                current_business_anchor = business_anchor_tags[counter]

                try:
                    if current_business_anchor:
                        print(f"{query} - 1: \n")
                        self.logger.info(f"{query} - 1: \n")
                        current_business_anchor_is_article_or_not = current_business_anchor.find_element(By.XPATH, ".//div[contains(@class, 'Nv2PK')]//a[contains(@class, 'hfpxzc')]")
                except NoSuchElementException:
                    self.logger.info(f"{query} - 1: NoSuchElementException \n")
                    pass
                except StaleElementReferenceException:
                    self.logger.info(f"{query} - 1: StaleElementReferenceException \n")
                    pass
                except Exception as e:
                    self.logger.info(f"{query} - 1: Exception {e} \n")
                    pass

                try:
                    if current_business_anchor:
                        print(f"{query} - 2: \n")
                        self.logger.info(f"{query} - 2: \n")
                        current_business_anchor_is_loader_or_not = current_business_anchor.find_element(By.XPATH, ".//div[@class='qjESne veYFef']")
                except NoSuchElementException:
                    self.logger.info(f"{query} - 2: NoSuchElementException \n")
                    pass
                except StaleElementReferenceException:
                    self.logger.info(f"{query} - 2: StaleElementReferenceException \n")
                    pass
                except Exception as e:
                    self.logger.info(f"{query} - 2: Exception {e} \n")
                    pass

                try:
                    if current_business_anchor:
                        print(f"{query} - 3: \n")
                        self.logger.info(f"{query} - 3: \n")
                        current_business_anchor_is_end_of_list_or_not = current_business_anchor.find_element(By.XPATH, ".//div[@class='PbZDve ']")
                except NoSuchElementException:
                    self.logger.info(f"{query} - 3: NoSuchElementException \n")
                    pass
                except StaleElementReferenceException:
                    self.logger.info(f"{query} - 3: StaleElementReferenceException \n")
                    pass
                except Exception as e:
                    self.logger.info(f"{query} - 3: Exception {e} \n")
                    pass

                if feed is None:
                    print(f"{query} - 4: \n")
                    self.logger.info(f"{query} - 4: \n")
                    break
                elif len(business_anchor_tags) <= counter:
                    self.logger.info(f"{query} - 5: \n")
                    print(f"{query} - 5: \n")
                    break

                if not current_business_anchor_is_article_or_not and not current_business_anchor_is_loader_or_not and not current_business_anchor_is_end_of_list_or_not:
                    print(f"{query} - 6: \n")
                    self.logger.info(f"{query} - 6: \n")
                    counter = counter + 1
                    continue
                if current_business_anchor_is_loader_or_not:
                    print(f"{query} - 7: \n")
                    self.logger.info(f"{query} - 7: \n")
                    while True:
                        try:
                            print(f"{query} - 8: \n")
                            self.logger.info(f"{query} - 8: \n")
                            business_anchor_tags = feed.find_elements(By.XPATH, "./child::*")
                            current_business_anchor = business_anchor_tags[counter]
                            current_business_anchor_is_loader_or_not = current_business_anchor.find_element(By.XPATH, ".//div[@class='qjESne veYFef']")
                        except NoSuchElementException:
                            self.logger.info(f"{query} - 8: NoSuchElementException \n")
                            break
                        except StaleElementReferenceException:
                            self.logger.info(f"{query} - 8: StaleElementReferenceException \n")
                            pass
                        except Exception as e:
                            self.logger.info(f"{query} - 8: Exception {e} \n")
                            pass

                        if current_business_anchor_is_loader_or_not:
                            print(f"{query} - 9: \n")
                            self.logger.info(f"{query} - 9: \n")
                            wait = WebDriverWait(self.driver, 5)
                            try:
                                wait.until(EC.invisibility_of_element_located((By.XPATH, "//div[@class='qjESne veYFef']")))
                            except NoSuchElementException:
                                self.logger.info(f"{query} - 9: NoSuchElementException \n")
                                pass
                            except TimeoutException:
                                try:
                                    next_business_anchor = business_anchor_tags[counter + 1]
                                    next_business_anchor_is_end_of_list_or_not = next_business_anchor.find_element(By.XPATH, ".//div[@class='PbZDve ']")
                                    if next_business_anchor_is_end_of_list_or_not:
                                        break
                                except Exception as e:
                                    self.logger.info(f"{query} - 9: TimeoutException => Exception {e} \n")
                                self.logger.info(f"{query} - 9: TimeoutException \n")
                                pass
                            except Exception as e:
                                self.logger.info(f"{query} - 9: Exception {e} \n")
                                pass
                            continue
                        else:
                            break
                    counter = counter + 1
                    continue
                if current_business_anchor_is_end_of_list_or_not:
                    print(f"{query} - 10: \n")
                    self.logger.info(f"{query} - 10: \n")
                    counter = counter + 1
                    break

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

                counter = counter + 1

                try:
                    if has_scrolled:
                        time.sleep(0.5)

                    self.logger.info("~~~~~~~~~~~~~~~~~ Scrolling ~~~~~~~~~~~~~~~~~~~~~~~~~")
                except Exception as e:
                    self.logger.exception("An error occurred while scrolling and extracting data: %s", e)
        # End of scrolling loop

        try:
            feed = self.driver.find_element(By.XPATH, "//div[@role='feed']")
            if feed != None:
                scroll_till_the_end_of_list(self, query, city)
        except NoSuchElementException:
            self.logger.warning("'feed' TimeoutException: 3. Continuing to the next step.")
            pass
        except StaleElementReferenceException:
            self.logger.warning("'feed' TimeoutException: 3. Continuing to the next step.")
            pass
        except TimeoutException:
            self.logger.warning("'feed' TimeoutException: 3. Continuing to the next step.")
            pass
        except Exception as e:
            self.logger.error("'feed' Exception: 3. Continuing to the next step. {e}")
            pass

        initialization_state = self.driver.execute_script("return window.APP_INITIALIZATION_STATE")
        json_initialization_state = json.loads(initialization_state[3][2].lstrip(")]}'\n").rstrip(','))

        businesses = []
        state = get_states(code=city['stateCode'], country_code=city['countryCode'])['states'][0]
        country = get_countries(code=city['countryCode'])['countries'][0]

        #Parse place endpoint data
        initialization_state_and_requests = None
        if len(json_initialization_state[0][1]) > 0:
            initialization_state_and_requests = json_initialization_state[0][1] + self.parse_network_traffic("https://www.google.com/search")
        elif len(json_initialization_state[64]) > 0:
            initialization_state_and_requests = json_initialization_state[64] + self.parse_network_traffic("https://www.google.com/search")

        counter = 1
        while True:
            try:
                #Data Seeding
                try:
                    current_business_data = {}
                    current_business_maps_data = initialization_state_and_requests[counter][14]
                except Exception as e:
                    self.logger.info(f"An error occurred in while loop where current_business_maps_data is seeding: {e}")
                
                #Heading
                try:
                    self.logger.info("~~~~~~~~ Basic Info ~~~~~~~~")
                    # soup = BeautifulSoup(self.driver.page_source, "html.parser")
                    # h1_text = soup.find("h1", class_="DUwDvf").text
                    current_business_data["place_id"] = current_business_maps_data[78]
                    current_business_data["name"] = current_business_maps_data[11]
                    self.logger.info(f"Title: {current_business_maps_data[11]}")
                    current_business_data["businessDomain"] = current_business_maps_data[13][0]
                except Exception as e:
                    self.logger.info(f"Basic Info: An error occurred while searching basic information: {e}")
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
                try:
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
                except Exception as e:
                    self.logger.info(f"Rating: An error occurred while searching ratings: {e}")

                #Latitude & Longitude
                try:
                    self.logger.info("~~~~~~~~ Location Info ~~~~~~~~")
                    lat_and_long = current_business_maps_data[9]
                    current_business_data["latitude"] = lat_and_long[2]
                    current_business_data["longitude"] = lat_and_long[3]
                    self.logger.info(f"Latitude & Longitude: {lat_and_long[2]}, {lat_and_long[3]}")
                except Exception as e:
                    self.logger.info(f"Latitude & Longitude: An error occurred while searching location: {e}")

                #Source
                current_business_data["source"] = sourceValues[0]
                self.logger.info(f"Source: {sourceValues[0]}")

                #Timezone
                try:
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
                except Exception as e:
                    self.logger.info(f"Timezone: An error occurred while searching timezone: {e}")

                #Address Info
                try:
                    self.logger.info("~~~~~~~~ Address Info ~~~~~~~~")
                    current_business_address = " ".join(current_business_maps_data[2])
                    current_business_data["address"] = current_business_address
                    self.logger.info(f"Place: {current_business_address}")
                except Exception as e:
                    self.logger.info(f"Address: An error occurred while searching address: {e}")
                    current_business_data["address"] = ", ".join([city['name'], state['name'], country['name']])
                
                #Postal Code Info
                try:
                    zip = get_postal_code(address=", ".join(current_business_maps_data[2]))
                    self.logger.info(f"Postal Code: {zip}")
                    current_business_data["postalCode"] = zip
                except Exception as e:
                    self.logger.info(f"Postal Code: An error occurred while searching postal code: {e}")
                
                #City/State/Country Info
                try:
                    current_business_data["cityId"] = city['id']
                    current_business_data["stateId"] = state['id']
                    current_business_data["countryId"] = country['id']
                    self.logger.info(f"CityId: {city['id']}")
                    self.logger.info(f"StateId: {state['id']}")
                    self.logger.info(f"CountryId: {country['id']}")
                except Exception as e:
                    self.logger.info(f"City/State/Country: An error occurred while searching city/state/country: {e}")

                #Schedule Info
                try:
                    self.logger.info("~~~~~~~~ Schedule Info ~~~~~~~~")
                    current_business_schedule = current_business_maps_data[34]
                    operating_hours = []
                    if current_business_schedule != None:
                        for schedule in current_business_schedule[1]:
                            day, hours = schedule[0], schedule[1]
                            if hours:
                                opening, closing = None, None
                                try:
                                    opening, closing = hours[0].replace("\u202f", "").split("–")
                                except Exception as e:
                                    opening=closing= hours[0]
                                operating_hours.append({
                                    'day': day,
                                    'openingHour': convert_to_24h_format(opening),
                                    'closingHour': convert_to_24h_format(closing),
                                })

                        # open_hour = current_business_schedule[1][0][1][0].replace("\u202f", "").split("–")[0]
                        # close_hour = current_business_schedule[1][0][1][0].replace("\u202f", "").split("–")[1]
                    else:
                        sample_schedule = [
                            ["Thursday", ["open 24 hours-closed"]],
                            ["Friday", ["open 24 hours-closed"]],
                            ["Saturday", ["open 24 hours-closed"]],
                            ["Sunday", ["open 24 hours-closed"]],
                            ["Monday", ["open 24 hours-closed"]],
                            ["Tuesday", ["open 24 hours-closed"]],
                            ["Wednesday", ["open 24 hours-closed"]]
                        ]
                        for schedule in sample_schedule:
                            day, hours = schedule[0], schedule[1]
                            if hours:
                                opening, closing = hours[0].split("-")
                                operating_hours.append({
                                    'day': day,
                                    'openingHour': convert_to_24h_format(opening),
                                    'closingHour': convert_to_24h_format(closing),
                                })
                    current_business_data["operatingHours"] = operating_hours
                    self.logger.info(f"Operating Hours: {operating_hours}")
                except Exception as e:
                    self.logger.info(f"Operating Hours: An error occurred while searching openingHour/closingHour: {e}")

                #Website
                try:
                    self.logger.info("~~~~~~~~ Contact Info ~~~~~~~~")
                    current_business_data["website"] = current_business_maps_data[7][1]
                    self.logger.info(f"Website: {current_business_maps_data[7][1]}")
                except Exception as e:
                    self.logger.info(f"Website: An error occurred while searching website: {e}")

                #Phone
                try:
                    current_business_data["phone"] = current_business_maps_data[178][0][3]
                    self.logger.info(f"Phone: {current_business_maps_data[178][0][3]}")
                except Exception as e:
                    self.logger.info(f"Phone: An error occurred while searching phone: {e}")
            except Exception as e:
                self.logger.info("An error occurred in while loop of scroll_and_parse_data function: {e}")
            
            counter = counter + 1
            businesses.append(current_business_data)
            if counter >= len(initialization_state_and_requests):
                # return create_businesses(businesses)
                response_object = { "results": businesses, "place_ids": [], "results_length": 0 }
                city_name = city['name']
                city_stateCode = city['stateCode']
                city_countryCode = city['countryCode']
                lat = city['latitude']
                long = city['longitude']
                self.save_data_to_file(self.logger, city_name, city_stateCode, city_countryCode, lat, long, response_object, query)
                return response_object

    def close(self):
        self.driver.quit()
