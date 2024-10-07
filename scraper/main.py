#!/usr/bin/env python

from src.scraper import BusinessScraper
from src.googlePlacesScraper import google_places_scraper
from config import LAPTOP_NAME, sourceValues
import logging
from dotenv import load_dotenv
from src.services.auth import login
from src.services.queue import get_queue, update_queue, create_city_queue
from src.services.businessSource import get_business_source
from src.services.city import get_cities
from concurrent.futures import ThreadPoolExecutor, wait
from src.utils.general import is_internet_available
import requests
from requests.exceptions import Timeout
import os
from datetime import datetime

# Load environment variables from .env file
load_dotenv()


def sanitize_search_query(query):
    """Sanitize the search query to avoid special characters and overly long filenames."""
    return ''.join(e for e in query if e.isalnum() or e in ['-', '_']).strip()


def setup_logger(city_name, stateCode, countryCode, lat, long, queue):
    """Setup logger to save logs into a file based on the directory structure."""
    # Get the directory of the current script
    script_directory = os.path.dirname(os.path.realpath(__file__))
    # parent_directory = os.path.dirname(script_directory)

    # Define the base folder for Google Places logs
    log_base_folder = os.path.join(script_directory, "places")

    # Create the log directory structure
    # current_date = datetime.now().strftime("%Y-%m-%d")
    # date_folder = os.path.join(log_base_folder, current_date)
    state_country_folder = os.path.join(log_base_folder, f"{stateCode}-{countryCode}")
    city_folder = os.path.join(state_country_folder, f"{city_name}-{lat}-{long}")

    # Sanitize the search query to use it as part of the filename
    sanitized_search_query = sanitize_search_query(queue['searchQuery'])

    # Final log file path: {search_query}.log inside the city folder
    log_file_path = os.path.join(city_folder, f"{sanitized_search_query}.log")

    # Create necessary directories if they don't exist
    os.makedirs(city_folder, exist_ok=True)
    # if not os.path.exists(city_folder):
    #     os.makedirs(city_folder)
    #     logger.info("Created directory: %s", city_folder)
    # else:
    #     logger.info("Directory already exists: %s", city_folder)

    # Create a new logger for this particular thread/task
    logger_name = f"{city_name}-{lat}-{long}-{sanitized_search_query}"
    logger = logging.getLogger(logger_name)
    # if logger.hasHandlers():
    #     logger.handlers.clear()  # Remove existing handlers
    
    # Avoid adding duplicate handlers if the logger has already been initialized
    if len(logger.handlers) == 0:
        logger.setLevel(logging.INFO)  # Set the logger level to INFO
        
        # Setup logging to file using FileHandler
        file_handler = logging.FileHandler(log_file_path)
        file_handler.setLevel(logging.INFO)
        formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(module)s - %(message)s")
        file_handler.setFormatter(formatter)

        # Add the file handler to the logger
        logger.addHandler(file_handler)

        # Optional: Add a stream handler if you want to see logs on console as well
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)
        logger.addHandler(stream_handler)

    logger.info("Logger initialized for search query: %s", sanitized_search_query)
    return logger  # Return this logger to be used in the thread/task


def process_queue(queue, city, business_source_id, scraper):
    # # Set up logging for the current search query and laptop name
    # current_date = datetime.datetime.now().strftime("%m-%d-%Y")
    # current_time = datetime.datetime.now().strftime("%H:%M")
    # log_file = f"scraper/logs/scraper__{current_date}__{current_time}__{queue['searchQuery'].replace(' ', '-')}__{LAPTOP_NAME.replace(' ', '-')}.log".lower()
    # logger = logging.getLogger(log_file)
    # logger.setLevel(logging.INFO)

    # # Add a file handler with the specific log file name
    # file_handler = logging.FileHandler(log_file)
    # formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(module)s - %(message)s")
    # file_handler.setFormatter(formatter)
    # logger.addHandler(file_handler)

    # # Add a stream handler to display logs on the console
    # stream_handler = logging.StreamHandler()
    # stream_handler.setFormatter(formatter)
    # logger.addHandler(stream_handler)

    city_name = city['name']
    city_stateCode = city['stateCode']
    city_countryCode = city['countryCode']
    lat = city['latitude']
    long = city['longitude']
    # Setup the logger for the current queue processing
    logger = setup_logger(city_name, city_stateCode, city_countryCode, lat, long, queue)

    while True:
        try:
            searchQuery = f"{queue['searchQuery'].replace('_', ' ')} near {', '.join(dict((key, value) for key, value in city.items() if key != 'id' and key != 'stateCode' and key != 'countryCode' and key != 'gdpInBillionUsd' and key != 'year' and key != 'longitude' and key != 'latitude' and key != 'createdAt' and key != 'updatedAt').values())}"
            # scraper = BusinessScraper(searchQuery=searchQuery, logger=logger)
            scraper.set_logger(logger)
            scraper.set_search_query(searchQuery)
            scraper.search(searchQuery)
            # scraper.scroll_and_extract_data(queue["searchQuery"], city)
            new_businesses = scraper.scroll_and_parse_data(queue["searchQuery"], city)

            city_queue = {
                "cityId": city["id"],
                "queueId": queue["id"],
                "businessSourceId": business_source_id,
                "status": "Completed",
            }
            if new_businesses is None:
                city_queue["status"] = "Failed"
            create_city_queue(request=city_queue)
            logger.info(f"Search for '{queue['searchQuery'].replace('_', ' ')}' near {', '.join(dict((key, value) for key, value in city.items() if key != 'id' and key != 'stateCode' and key != 'countryCode' and key != 'gdpInBillionUsd' and key != 'year' and key != 'longitude' and key != 'latitude' and key != 'createdAt' and key != 'updatedAt').values())} completed.")
            # scraper.close()
            break
        except (Timeout, requests.exceptions.RequestException, Exception) as e:
            while True:
                if is_internet_available(logger):
                    logger.info("Internet connection is working. Retrying... {e}")
                    # scraper.close()
                    break
                else:
                    logger.info("Internet connection is not available. Retrying in 5 seconds... {e}")


def main():
    logging.info("Scraping process started.")

    login(os.environ.get("BACKEND_USER"), os.environ.get("BACKEND_USER_PASSWORD"))

    LIMIT = int(os.environ.get("MAX_WORKERS"))  # Number of queues to process per page
    business_source = get_business_source(sourceName=sourceValues[0])
    total_pages_queues = get_queue(limit=1)["totalPages"]
    total_pages_cities = get_cities(limit=LIMIT)["totalPages"]

    for city_page in range(1, total_pages_cities + 1):
        cities_response = get_cities(page=city_page, limit=LIMIT)
        browsers = {}
        if not cities_response["totalRecords"] > 0:
            logging.error("Failed to retrieve cities for city page %d.", city_page)
            continue

        for city in cities_response["cities"]:
            scraper = BusinessScraper()
            browsers[city["id"]] = scraper

        for queue_page in range(1, total_pages_queues + 1):
            # queues_response = get_queue(city_id=cities_response["cities"][city_page - 1]['id'], page=queue_page, limit=LIMIT)
            # if not queues_response["totalRecords"] > 0:
            #     logging.error("Failed to retrieve queues for queue page %d.", queue_page)
            #     continue
            queue_is_empty = False

            with ThreadPoolExecutor(max_workers=LIMIT) as executor:
                futures = []
                for city in cities_response["cities"]:
                    queues_response = get_queue(city_id=city['id'], business_source_Id=business_source['id'], page=queue_page, limit=1)
                    if len(queues_response["queues"]) < 1:
                        queue_is_empty = True
                        break
                    for queue in queues_response["queues"]:
                        if queue["laptopName"] != "":
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
                        future = executor.submit(process_queue, queue, city, business_source["id"], browsers[city["id"]])
                        futures.append(future)
                    # break

            # Wait for all tasks on this page to complete
            wait(futures)

            if queue_is_empty is True:
                break

        for city in cities_response["cities"]:
            browsers[city["id"]].close()

    logging.info("Scraping process completed.")


if __name__ == "__main__":
    try:
        findPlaceMain = os.environ.get("FIND_PLACE_MAIN")
        if findPlaceMain == "True":
            google_places_scraper()
        else:
            print("Main")
            # Set up logging for the main script
            current_date = datetime.now().strftime("%m-%d-%Y")
            log_file = f"scraper/logs/main__{current_date}__{LAPTOP_NAME.replace(' ', '-')}.log".lower()
            logging.basicConfig(filename=log_file,level=logging.INFO,format="%(asctime)s - %(levelname)s - %(module)s - %(message)s")
            main()
    except Exception as e:
        logging.exception("An unhandled error occurred during scraper execution: %s", e)
