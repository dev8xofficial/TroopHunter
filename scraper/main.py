#!/usr/bin/env python

from src.scraper import BusinessScraper
from config import LAPTOP_NAME
import logging
import datetime
from dotenv import load_dotenv
from src.services.auth import login
from src.services.queue import get_queue, update_queue, create_city_queue
from src.services.city import get_cities
from concurrent.futures import ThreadPoolExecutor, wait
from src.utils.general import is_internet_available
import requests
from requests.exceptions import Timeout
import os

# Load environment variables from .env file
load_dotenv()


def process_queue(queue, city):
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
            searchQuery = f"{queue['searchQuery'].replace('_', ' ')} near {', '.join(dict((key, value) for key, value in city.items() if key != 'id' and key != 'stateCode' and key != 'countryCode' and key != 'gdpInBillionUsd' and key != 'year' and key != 'longitude' and key != 'latitude' and key != 'createdAt' and key != 'updatedAt').values())}"
            scraper = BusinessScraper(searchQuery=searchQuery, logger=logger)
            scraper.search(searchQuery)
            # scraper.scroll_and_extract_data(queue["searchQuery"], city)
            new_businesses = scraper.scroll_and_parse_data(queue["searchQuery"], city)

            city_queue = {
                "cityId": city["id"],
                "queueId": queue["id"],
                "status": "Completed",
            }
            if new_businesses is None:
                city_queue["status"] = "Failed"
            create_city_queue(request=city_queue)
            logger.info(f"Search for '{queue['searchQuery'].replace('_', ' ')}' near {', '.join(dict((key, value) for key, value in city.items() if key != 'id' and key != 'stateCode' and key != 'countryCode' and key != 'gdpInBillionUsd' and key != 'year' and key != 'longitude' and key != 'latitude' and key != 'createdAt' and key != 'updatedAt').values())} completed.")
            scraper.close()
            break
        except (Timeout, requests.exceptions.RequestException, Exception) as e:
            while True:
                if is_internet_available():
                    logger.info("Internet connection is working. Retrying...")
                    scraper.close()
                    break
                else:
                    logger.info("Internet connection is not available. Retrying in 5 seconds...")


def main():
    logging.info("Scraping process started.")

    login(os.environ.get("BACKEND_USER"), os.environ.get("BACKEND_USER_PASSWORD"))

    LIMIT = int(os.environ.get("MAX_WORKERS"))  # Number of queues to process per page
    total_pages_queues = get_queue(limit=LIMIT)["totalPages"]
    total_pages_cities = get_cities(limit=LIMIT)["totalPages"]

    for city_page in range(1, total_pages_cities + 1):
        cities_response = get_cities(page=city_page, limit=1)
        if not cities_response["totalRecords"] > 0:
            logging.error("Failed to retrieve cities for city page %d.", city_page)
            continue
        for queue_page in range(1, total_pages_queues + 1):
            queues_response = get_queue(city_id=cities_response["cities"][city_page - 1]['id'], page=queue_page, limit=LIMIT)
            if not queues_response["totalRecords"] > 0:
                logging.error("Failed to retrieve queues for queue page %d.", queue_page)
                continue

            with ThreadPoolExecutor(max_workers=LIMIT) as executor:
                futures = []
                for city in cities_response["cities"]:
                    for queue in queues_response["queues"]:
                        if queue["laptopName"] is not "":
                            try:
                                if queue["status"] == "Completed" or queue["status"] == "Failed":
                                    pass
                            except Exception as e:
                                pass
                        elif queue["laptopName"] == "":
                            queue["laptopName"] = LAPTOP_NAME
                            update_queue(request=queue)
                        else:
                            continue

                        # Submit each search task to the ThreadPoolExecutor
                        future = executor.submit(process_queue, queue, city)
                        futures.append(future)
                    break

                # Wait for all tasks on this page to complete
                wait(futures)

    logging.info("Scraping process completed.")


if __name__ == "__main__":
    try:
        # Set up logging for the main script
        current_date = datetime.datetime.now().strftime("%m-%d-%Y")
        log_file = f"scraper/logs/main__{current_date}__{LAPTOP_NAME.replace(' ', '-')}.log".lower()
        logging.basicConfig(filename=log_file,level=logging.INFO,format="%(asctime)s - %(levelname)s - %(module)s - %(message)s")
        main()
    except Exception as e:
        logging.exception("An unhandled error occurred during scraper execution: %s", e)
