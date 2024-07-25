from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import re
import phonenumbers
from datetime import datetime
import logging


def convert_to_24h_format(time_str):
    try:
        # Handle "Open 24 hours" case
        if time_str.lower() == "open 24 hours":
            return "00:00"
        if time_str.lower() == "closed":
            return "23:59"

        # Remove any non-alphanumeric characters except ":" and whitespace
        time_str = re.sub(r"[^\w\s:]", "", time_str)

        # Handle "AM" and "PM" cases
        if "am" in time_str.lower() or "pm" in time_str.lower():
            # Extract hour and minute values
            match = re.search(r"(\d{1,2}):?(\d{2})?\s?(am|pm)", time_str.lower())
            if match:
                hour = int(match.group(1))
                minute = int(match.group(2)) if match.group(2) else 0
                period = match.group(3)
                if period == "pm" and hour < 12:
                    hour += 12
                elif period == "am" and hour == 12:
                    hour = 0
                return datetime.strptime(f"{hour}:{minute:02}", "%H:%M").strftime("%H:%M")

        # Handle 24-hour format
        match = re.search(r"(\d{1,2}):?(\d{2})?", time_str)
        if match:
            hour = int(match.group(1))
            minute = int(match.group(2)) if match.group(2) else 0
            return datetime.strptime(f"{hour}:{minute:02}", "%H:%M").strftime("%H:%M")

    except Exception as e:
        logging.exception("An error occurred while converting to 24-hour format: %s", e)

    # Return None if no valid time format is found
    return None


def get_cleaned_phone(phone: str):
    cleaned_phone = None
    try:
        if phone:
            cleaned_phone = re.sub(r"[^0-9+]", "", phone.replace("· ", ""))
            phone_obj = phonenumbers.parse(cleaned_phone, None)
            is_phone_valid = phonenumbers.is_valid_number(phone_obj)
            if not is_phone_valid:
                cleaned_phone = None
    except Exception as e:
        logging.exception("An error occurred while cleaning phone number: %s", e)

    return cleaned_phone


def click_feed_article(self, current_business_anchor):
    ActionChains(self.driver).move_to_element(current_business_anchor).click().perform()

    # Wait for the Heading element to appear on the view
    wait = WebDriverWait(self.driver, self.long_wait)
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".tAiQdd")))
    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".DUwDvf")))


def close_feed_article(self):
    close_current_business_anchor = self.driver.find_element(By.XPATH, ".//div[@class='m6QErb WNBkOb XiKgde '][@role='main']//button[@aria-label='Close']")
    close_current_business_anchor.click()


def split_string(text):
    # Define the regular expression pattern for splitting
    pattern = r"[\W_]+"

    # Split the string using the pattern
    result = re.split(pattern, text)

    return result


def check_words(wait, url, words):
    # Check if each word in the array exists in the name
    for word in words:
        if word not in url:
            return False
        wait.until(EC.url_contains(word))
    return True


def wait_for_url(self, h1_text):
    # Wait until the URL contains the expected business name
    wait = WebDriverWait(self.driver, self.medium_wait)  # Adjust the timeout as needed

    splitted_text = split_string(h1_text)

    # if name:
    exists = check_words(wait, self.driver.current_url, splitted_text)
    self.logger.info(f"Does name exist in URL?: {exists}")
