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
from bs4 import BeautifulSoup
import csv
import urllib
from config import BASE_URL

import logging
import datetime

# Get the current date
current_date = datetime.datetime.now().strftime("%m-%d-%Y")

# Set up logging with the current date in the log file name
log_file = f"scraper/logs/scraper-{current_date}.log"
logging.basicConfig(filename=log_file, level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Create a stream handler for console output
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
console_formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
console_handler.setFormatter(console_formatter)

# Add the stream handler to the root logger
root_logger = logging.getLogger()
root_logger.addHandler(console_handler)


class BusinessScraper:
    def __init__(self):
        chrome_options = Options()
        # chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-network")
        chrome_options.add_argument("--force-effective-connection-type=slow-3g")
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--auto-open-devtools-for-tabs")

        try:
            logging.info("Initiating chrome web driver.")
            self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        except WebDriverException:
            logging.error("Service chromedriver unexpectedly exited.")

    def search(self, query):
        logging.info(f"Searching for query: {query}")
        self.driver.get(f"{BASE_URL}/{urllib.parse.quote_plus(query)}")

    def scroll_and_extract_data(self):
        logging.info("Scrolling into feed.")
        scrollable_div = self.driver.find_element(By.XPATH, "//div[@role='feed']")
        counter = 0
        short_wait = 2
        long_wait = 60

        while True:
            feed = self.driver.find_element(By.XPATH, "//div[@role='feed']")
            business_anchor_tags = scrollable_div.find_elements(By.XPATH, "./child::*")
            current_business_anchor = business_anchor_tags[counter]
            current_business_anchor_is_article_or_not = None
            current_business_anchor_is_loader_or_not = None
            current_business_anchor_is_end_of_list_or_not = None

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
                        business_anchor_tags = scrollable_div.find_elements(By.XPATH, "./child::*")
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

            logging.info("====== New Business ======")
            ActionChains(self.driver).move_to_element(current_business_anchor).click().perform()
            counter = counter + 1

            # Wait for the Heading element to appear on the view
            wait = WebDriverWait(self.driver, long_wait)
            wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".tAiQdd")))
            wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".DUwDvf.fontHeadlineLarge")))

            soup = BeautifulSoup(self.driver.page_source, "html.parser")

            # Heading
            h1_text = soup.find("h1", class_="DUwDvf fontHeadlineLarge").text
            logging.info(f"Title: {h1_text}")

            # Rating
            rating_text = soup.find("div", class_="F7nice").text
            logging.info(f"Rating: {rating_text}")

            merged_elements = self.driver.find_elements(By.CLASS_NAME, "RcCsl") + self.driver.find_elements(By.CLASS_NAME, "OqCZI")
            html_sources = [element.get_attribute("innerHTML") for element in merged_elements]
            soup_elements = [BeautifulSoup(html, "html.parser") for html in html_sources]
            for info in soup_elements:
                img_with_place_src = info.find("img", {"src": lambda s: "place" in s})
                img_with_schedule_src = info.find("img", {"src": lambda s: "schedule" in s})
                img_with_shipping_src = info.find("img", {"src": lambda s: "shipping" in s})
                img_with_public_src = info.find("img", {"src": lambda s: "public" in s})
                img_with_phone_src = info.find("img", {"src": lambda s: "phone" in s})
                img_with_plus_code_src = info.find("img", {"src": lambda s: "plus_code" in s})
                img_with_send_to_mobile_src = info.find("img", {"src": lambda s: "send_to_mobile" in s})

                if img_with_place_src:
                    tr_text = info.get_text("|", strip=True)
                    logging.info(f"Place Info: {tr_text}")
                elif img_with_schedule_src:
                    tr_elements = soup.find_all("tr", class_="y0skZc")
                    logging.info("Shipping Info: ")

                    for tr in tr_elements:
                        td_elements = tr.find_all("td")

                        if len(td_elements) >= 2:
                            first_td_text = td_elements[0].text.strip()
                            second_td_text = td_elements[1].text.strip()
                            logging.info(f"{first_td_text}: {second_td_text}")
                elif img_with_shipping_src:
                    tr_text = info.get_text("|", strip=True)
                    logging.info(f"Shipping Info: {tr_text}")
                elif img_with_public_src:
                    tr_text = info.get_text("|", strip=True)
                    logging.info(f"Website Info: {tr_text}")
                elif img_with_phone_src:
                    tr_text = info.get_text("|", strip=True)
                    logging.info(f"Phone Info: {tr_text}")
                elif img_with_plus_code_src:
                    tr_text = info.get_text("|", strip=True)
                    logging.info(f"Plus Code Info: {tr_text}")
                elif img_with_send_to_mobile_src:
                    tr_text = info.get_text("|", strip=True)
                    logging.info(f"Send To Mobile Info: {tr_text}")
                else:
                    logging.info(f"Other Info: {tr_text}")

            if has_scrolled:
                close_current_business_anchor = self.driver.find_element(By.XPATH, ".//div[@class='m6QErb WNBkOb '][@role='main']//button[@aria-label='Close']")
                close_current_business_anchor.click()
                time.sleep(short_wait)
                logging.info("~~~~~~ Scrolling ~~~~~~")

    def save_to_csv(self, data, output_file):
        with open(output_file, "w", newline="", encoding="utf-8") as csv_file:
            writer = csv.writer(csv_file)

    def close(self):
        self.driver.quit()
