import time
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
from bs4 import BeautifulSoup
import csv
import urllib
from config import BASE_URL

class HeightZeroCondition:
    def __init__(self, locator):
        self.locator = locator

    def __call__(self, driver):
        element = driver.find_element(*self.locator)
        return element.size['height'] == 0


class BusinessScraper:
    def __init__(self):
        self.driver = webdriver.Chrome(ChromeDriverManager().install())

    def search(self, query):
        self.driver.get(f'{BASE_URL}/{urllib.parse.quote_plus(query)}')

    def scroll_and_extract_data(self):
        scrollable_div = self.driver.find_element(By.XPATH, "//div[@role='feed']")
        loading_div = self.driver.find_elements(By.XPATH, "//div[@class='qjESne veYFef']")
        counter = 0
        
        while True:
            el = self.driver.find_element(By.XPATH, "//div[@role='feed']")
            business_anchor_tags = self.driver.find_elements(By.XPATH, ".//div[@role='article']//a[@class='hfpxzc']")

            if el is None:
                break
            elif len(business_anchor_tags) <= counter:
                break
            else:
                current_business_anchor = business_anchor_tags[counter]
                has_scrolled = self.driver.execute_script("arguments[0].scrollIntoView(true);", current_business_anchor)

                ActionChains(self.driver).move_to_element(current_business_anchor).click().perform()
                counter = counter + 1

                # Wait for the div element to appear on the view
                wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
                wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.tAiQdd')))
                wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.DUwDvf.fontHeadlineLarge')))

                # Process the clicked anchor tag as needed
                soup = BeautifulSoup(self.driver.page_source, 'html.parser')

                # Extract text from the h1 element
                h1_text = soup.find('h1', class_='DUwDvf fontHeadlineLarge').text
                print("Title:", h1_text)

                # Extract text from the div element with class "F7nice"
                rating_text = soup.find('div', class_='F7nice').text
                print("Rating:", rating_text)

                # # Extract text from the div element with class "Io6YTe"
                merged_elements = self.driver.find_elements(By.CLASS_NAME, "RcCsl") + self.driver.find_elements(By.CLASS_NAME, "OqCZI")
                html_sources = [element.get_attribute('innerHTML') for element in merged_elements]
                soup_elements = [BeautifulSoup(html, 'html.parser') for html in html_sources]
                # business_quick_info = soup.find_all(class_="RcCsl") + soup.find_all(class_="OqCZI")
                for info in soup_elements:
                    img_with_place_src = info.find('img', {'src': lambda s: 'place' in s})
                    img_with_schedule_src = info.find('img', {'src': lambda s: 'schedule' in s})
                    img_with_shipping_src = info.find('img', {'src': lambda s: 'shipping' in s})
                    img_with_public_src = info.find('img', {'src': lambda s: 'public' in s})
                    img_with_phone_src = info.find('img', {'src': lambda s: 'phone' in s})
                    img_with_plus_code_src = info.find('img', {'src': lambda s: 'plus_code' in s})
                    img_with_send_to_mobile_src = info.find('img', {'src': lambda s: 'send_to_mobile' in s})

                    if img_with_place_src:
                        tr_text = info.get_text("|", strip=True)
                        print("Place Info:", tr_text)
                    elif img_with_schedule_src:
                        tr_elements = soup.find_all('tr', class_="y0skZc")
                        print("Shipping Info: ")

                        # Iterate over each <tr> element
                        for tr in tr_elements:
                            # Find the first and second <td> elements within the current <tr>
                            td_elements = tr.find_all('td')

                            # Extract the text from the first and second <td> elements
                            if len(td_elements) >= 2:
                                first_td_text = td_elements[0].text.strip()
                                second_td_text = td_elements[1].text.strip()
                                print(f'{first_td_text}: {second_td_text}')
                    elif img_with_shipping_src:
                        tr_text = info.get_text("|", strip=True)
                        print("Shipping Info:", tr_text)
                    elif img_with_public_src:
                        tr_text = info.get_text("|", strip=True)
                        print("Website Info:", tr_text)
                    elif img_with_phone_src:
                        tr_text = info.get_text("|", strip=True)
                        print("Phone Info:", tr_text)
                    elif img_with_plus_code_src:
                        tr_text = info.get_text("|", strip=True)
                        print("Plus Code Info:", tr_text)
                    elif img_with_send_to_mobile_src:
                        tr_text = info.get_text("|", strip=True)
                        print("Send To Mobile Info:", tr_text)
                    else:
                        print("Other Info:", tr_text)

                if not has_scrolled:
                    time.sleep(2)
                    print(f'\nScrolling to {counter}...\n')
                else:
                    print(f'\nScrolling to {counter}...\n')
                    # if loading_div.is_displayed():
                    #     # Wait until the loading_div gets hidden
                    #     wait = WebDriverWait(self.driver, 2)  # Adjust the timeout as needed
                    #     try:
                    #         wait.until(EC.invisibility_of_element_located((By.XPATH, "//div[@class='qjESne veYFef']")))
                    #         print('\nScrolling...\n')
                    #     except TimeoutException:
                    #         # Handle the timeout exception here
                    #         print("Loading div did not become invisible within the timeout period.")
                    #     print(loading_div.is_displayed())
                    # else:
                    #     wait = WebDriverWait(self.driver, 2)  # Adjust the timeout as needed
                    #     print('\nScrolling...\n', loading_div.is_displayed())


        page_source = self.driver.page_source
        soup = BeautifulSoup(page_source, 'html.parser')
        # Extract data from the soup object and store it in a suitable data structure

    def save_to_csv(self, data, output_file):
        with open(output_file, 'w', newline='', encoding='utf-8') as csv_file:
            writer = csv.writer(csv_file)
            # Write data to the CSV file

    def close(self):
        self.driver.quit()
