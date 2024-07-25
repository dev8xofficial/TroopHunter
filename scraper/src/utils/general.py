from seleniumwire import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import time
import requests

from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from requests.exceptions import Timeout
from selenium.common.exceptions import TimeoutException
import time


def is_internet_available():
    try:
        # Send a request to Google to check internet availability
        requests.get("https://www.google.com")
        return True
    except requests.exceptions.RequestException:
        return False


def handle_timeout_with_retry(dynamic_code_for_try, dynamic_code_for_catch=None, self=None, logger=None):
    while True:
        try:
            dynamic_code_for_try()
            break
        except (Timeout, TimeoutException, requests.exceptions.RequestException, Exception) as e:
            while True:
                if is_internet_available():
                    if dynamic_code_for_catch:
                        try:
                            dynamic_code_for_catch()
                        except NoSuchElementException as e:
                            logger.error("No such element found", {e})
                            pass
                    if isinstance(e, TimeoutException) and "disconnected:" in str(e):
                        self.close()
                        # Chrome Options
                        chrome_options = Options()
                        # chrome_options.add_argument("--headless")
                        # chrome_options.add_argument("--disable-network")
                        # chrome_options.add_argument("--force-effective-connection-type=slow-3g")
                        chrome_options.add_argument("--start-maximized")
                        # chrome_options.add_argument("--auto-open-devtools-for-tabs")
                        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
                        self.search(search=self.searchQuery)
                    logger.error("handle_timeout_with_retry method exception")
                    logger.info("Internet connection is working. Retrying...", {e})
                    break
                else:
                    logger.info("Internet connection is not available. Retrying in 5 seconds...")
                    time.sleep(5)
