from src.scraper import BusinessScraper
from config import LOCATIONS, LAPTOP_NAME
import logging
import datetime
from dotenv import load_dotenv
from services.queue import get_queue, update_queue
from concurrent.futures import ThreadPoolExecutor, wait
import time
from src.utils import handle_timeout_with_retry, is_internet_available
import requests
from requests.exceptions import Timeout

# Load environment variables from .env file
load_dotenv()


def process_queue(queue, location):
    # Set up logging for the current search query and laptop name
    current_date = datetime.datetime.now().strftime("%m-%d-%Y")
    log_file = f"scraper/logs/scraper__{current_date}__{queue['searchQuery'].replace(' ', '-')}__{LAPTOP_NAME.replace(' ', '-')}.log".lower()
    logger = logging.getLogger(log_file)
    logger.setLevel(logging.INFO)

    # Add a file handler with the specific log file name
    file_handler = logging.FileHandler(log_file)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(module)s - %(message)s")
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    # Add a stream handler to display logs on the console
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(formatter)
    logger.addHandler(stream_handler)

    while True:
        try:
            searchQuery = f"{queue['searchQuery']} in {', '.join(dict((key, value) for key, value in location.items() if key != 'timezone' and key != 'countryCode').values())}"
            scraper = BusinessScraper(searchQuery=searchQuery, logger=logger)
            scraper.search(searchQuery)
            scraper.scroll_and_extract_data(queue["searchQuery"], location)

            queue["status"] = "Completed"
            update_queue(request=queue)
            logger.info(f"Search for '{queue['searchQuery']}' in {location} completed.")
            scraper.close()
            break
        except (Timeout, requests.exceptions.RequestException, Exception) as e:
            while True:
                if is_internet_available():
                    scraper.close()
                    logger.info("Internet connection issue resolved. Retrying...")
                    break
                else:
                    logger.info("Internet connection is not available. Retrying in 5 seconds...")


def main():
    logging.info("Scraping process started.")

    QUEUES = get_queue()

    # Create a ThreadPoolExecutor with a maximum of 3 threads
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = []
        for location in LOCATIONS:
            for queue in QUEUES:
                if queue["laptopName"] == LAPTOP_NAME and queue["status"] == "Pending":
                    pass
                elif queue["laptopName"] == "" and queue["status"] == "Pending":
                    queue["laptopName"] = LAPTOP_NAME
                    update_queue(request=queue)
                else:
                    continue

                # Submit each search task to the ThreadPoolExecutor
                future = executor.submit(process_queue, queue, location)
                futures.append(future)

        # Wait for all tasks to complete
        wait(futures)

    logging.info("Scraping process completed.")


if __name__ == "__main__":
    try:
        # Set up logging for the main script
        current_date = datetime.datetime.now().strftime("%m-%d-%Y")
        log_file = f"scraper/logs/main__{current_date}__{LAPTOP_NAME.replace(' ', '-')}.log".lower()
        logging.basicConfig(filename=log_file, level=logging.INFO, format="%(asctime)s - %(levelname)s - %(module)s - %(message)s")
        main()
    except Exception as e:
        logging.exception("An unhandled error occurred during scraper execution: %s", e)
