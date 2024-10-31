#!/usr/bin/env python

from config import sourceValues
import logging
from dotenv import load_dotenv
from src.services.auth import login
from src.services.queue import get_queue, create_city_queue
from src.services.businessSource import get_business_source
from src.services.city import get_cities
from concurrent.futures import ThreadPoolExecutor, wait
from src.utils.general import is_internet_available
import requests
import json
import os
import time
from datetime import datetime
import random

load_dotenv()
API_KEY = os.getenv("PLACE_API_KEY")
logger = logging.getLogger()
MOCK_MODE = os.getenv("MOCK_MODE", "False").lower() == "True"


def get_mock_nearby_places():
    """Return mock nearby search data."""
    return {
        "status": "OK",
        "results": [
            {
                "place_id": f"mock_place_id_{random.randint(1000, 9999)}",
                "name": "Mock Restaurant",
                "formatted_address": "123 Mock St, Mock City, USA",
                "rating": random.uniform(3.0, 5.0),
                "user_ratings_total": random.randint(100, 1000),
                "types": ["restaurant", "food", "point_of_interest"],
                "geometry": {
                    "location": {
                        "lat": random.uniform(-90.0, 90.0),
                        "lng": random.uniform(-180.0, 180.0)
                    }
                }
            } for _ in range(5)
        ]
    }


def get_mock_place_details(place_id):
    """Return mock place details data."""
    return {
        "status": "OK",
        "result": {
            "formatted_phone_number": "+1-800-MOCK",
            "international_phone_number": "+1-800-MOCK",
            "website": f"https://www.mockwebsite{random.randint(1000, 9999)}.com",
            "name": f"Mock Business {random.randint(100, 999)}",
            "rating": random.uniform(3.5, 5.0),
            "formatted_address": "456 Mock Ave, Mock City, USA",
            "business_status": "OPERATIONAL",
            "opening_hours": {
                "open_now": random.choice([True, False]),
                "weekday_text": [
                    "Monday: 9:00 AM – 5:00 PM",
                    "Tuesday: 9:00 AM – 5:00 PM",
                    "Wednesday: 9:00 AM – 5:00 PM",
                    "Thursday: 9:00 AM – 5:00 PM",
                    "Friday: 9:00 AM – 5:00 PM",
                ]
            }
        }
    }


def initialize_global_logger():
    """Initialize the global logger with default settings."""
    logging.basicConfig(level=logging.INFO,format="%(asctime)s - %(levelname)s - %(module)s - %(message)s")


def sanitize_search_query(query):
    """Sanitize the search query to avoid special characters and overly long filenames."""
    return ''.join(e for e in query if e.isalnum() or e in ['-', '_']).strip()


def setup_city_logger(city_name, stateCode, countryCode, lat, long):
    """Setup logger to save logs for a city based on the directory structure."""
    # Get the directory of the current script
    script_directory = os.path.dirname(os.path.realpath(__file__))
    parent_directory = os.path.dirname(script_directory)

    # Define the base folder for Google Places logs
    log_base_folder = os.path.join(parent_directory, "googlePlaces")

    # Create the log directory structure
    # current_date = datetime.now().strftime("%Y-%m-%d")
    # date_folder = os.path.join(log_base_folder, current_date)
    state_country_folder = os.path.join(log_base_folder, f"{stateCode}-{countryCode}")
    city_folder = os.path.join(state_country_folder, f"{city_name}-{lat}-{long}")

    # Path for the city log file beside the folder
    city_log_file_path = os.path.join(state_country_folder, f"{city_name}-{lat}-{long}.log")

    # Create necessary directories if they don't exist
    os.makedirs(city_folder, exist_ok=True)

    # Create a new logger for the city
    logger_name = f"{city_name}-{lat}-{long}"
    logger = logging.getLogger(logger_name)

    # Avoid adding duplicate handlers if the logger has already been initialized
    if len(logger.handlers) == 0:
        logger.setLevel(logging.INFO)  # Set the logger level to INFO

        # Setup logging to file using FileHandler
        file_handler = logging.FileHandler(city_log_file_path)
        file_handler.setLevel(logging.INFO)
        formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(module)s - %(message)s")
        file_handler.setFormatter(formatter)

        # Add the file handler to the logger
        logger.addHandler(file_handler)

        # Optional: Add a stream handler if you want to see logs on the console as well
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)
        logger.addHandler(stream_handler)

    logger.info("City logger initialized for: %s, %s, %s", city_name, lat, long)
    return logger  # Return this logger to be used in the google_places_scraper function


def setup_logger(city_name, stateCode, countryCode, lat, long, queue):
    """Setup logger to save logs into a file based on the directory structure."""
    # Get the directory of the current script
    script_directory = os.path.dirname(os.path.realpath(__file__))
    parent_directory = os.path.dirname(script_directory)

    # Define the base folder for Google Places logs
    log_base_folder = os.path.join(parent_directory, "googlePlaces")

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


def fetch_google_places(logger, lat, long, place_type, page_token=None, timeout=30):
    """Fetch places using Google Places API with timeout, enrich them with more details."""

    if MOCK_MODE:
        logger.info("Mock mode enabled, returning mock nearby places data.")
        places_data = get_mock_nearby_places()
        for place in places_data.get("results", []):
            place_id = place.get("place_id")
            place.update(get_mock_place_details(place_id).get("result", {}))
        return places_data

    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{lat},{long}",
        "radius": 50000,
        "type": place_type,
        "key": API_KEY,
    }

    if page_token:
        params["pagetoken"] = page_token

    try:
        logger.info("Starting nearby search for location (%s, %s) with type '%s'.", lat, long, place_type)
        
        # Set a timeout to wait for a response
        response = requests.get(url, params=params, timeout=timeout)
        response.raise_for_status()

        # Save the nearby search response in a variable
        places_data = response.json()

        # Handle response status for Nearby Search
        status = places_data.get("status")
        logger.info("Received response from Nearby Search API with status: %s", status)

        if status == "OK":
            logger.info("Successfully fetched %d results.", len(places_data.get("results", [])))
            # Process results
            for place in places_data.get("results", []):
                place_id = place.get("place_id")

                if place_id:
                    logger.info("Fetching details for place_id: %s", place_id)

                    # Fetch more details for this place using the Place Details API
                    place_details_url = "https://maps.googleapis.com/maps/api/place/details/json"
                    details_params = {
                        "place_id": place_id,
                        "fields": "formatted_phone_number,international_phone_number,opening_hours,secondary_opening_hours,website,name,rating,address_components,formatted_address,price_level,opening_hours,business_status,photos,delivery,dine_in",
                        "key": API_KEY
                    }

                    try:
                        # Request the additional details
                        details_response = requests.get(place_details_url, params=details_params, timeout=timeout)
                        details_response.raise_for_status()
                        place_details = details_response.json()

                        # Handle response status for Place Details
                        details_status = place_details.get("status")
                        if details_status == "OK":
                            logger.info("Successfully fetched details for place_id: %s", place_id)
                            # Merge the details with the original place data
                            place.update(place_details.get("result", {}))
                        elif details_status in ["ZERO_RESULTS", "NOT_FOUND", "INVALID_REQUEST", "REQUEST_DENIED", "UNKNOWN_ERROR"]:
                            logger.warning(f"Skipping place_id {place_id} due to status: {details_status}.")
                            continue  # Skip this place and move to the next
                        elif details_status == "OVER_QUERY_LIMIT":
                            logger.error("Over query limit while fetching details for place_id: %s. Shutting down the scraper.", place_id)
                            raise Exception("Over query limit.")

                    except requests.exceptions.Timeout:
                        logger.error("Details request for place_id %s timed out.", place_id)
                    except requests.exceptions.RequestException as e:
                        logger.error("Error fetching details for place_id %s: %s", place_id, e)

            # Return the enriched places data
            logger.info("Enriched places data ready to return.")
            return places_data

        elif status == "ZERO_RESULTS":
            logger.info("No results found for the specified location and type.")
            return places_data  # Return the response even if there are no results

        elif status in ["INVALID_REQUEST", "REQUEST_DENIED", "UNKNOWN_ERROR"]:
            logger.error(f"Invalid request for nearby search: {status}. Skipping this queue.")
            return None  # Skip this queue by returning None

        elif status == "OVER_QUERY_LIMIT":
            logger.error("Over query limit for nearby search. Shutting down the scraper.")
            raise Exception("Over query limit.")  # Raise an exception to shut down the scraper

    except requests.exceptions.Timeout:
        logger.error("The nearby search request timed out. Please try again later.")
    except requests.exceptions.RequestException as e:
        logger.error("Error fetching data from Google Places API: %s", e)

    return None


def save_data_to_file(logger, city_name, stateCode, countryCode, lat, long, new_data, queue):
    """Save API response to a file or merge with existing data, and track place_ids to avoid duplication"""

    logger.info("Starting to save data for city: %s", city_name)

    # Get the directory of the current script
    script_directory = os.path.dirname(os.path.realpath(__file__))

    # Move one directory back
    parent_directory = os.path.dirname(script_directory)

    # Define the folder path based on the new structure
    # Date (YYYY-MM-DD)
    # current_date = datetime.now().strftime('%Y-%m-%d')
    # date_folder = os.path.join(parent_directory, "googlePlaces", current_date)
    date_folder = os.path.join(parent_directory, "googlePlaces")

    # StateCode-CountryCode folder
    state_country_folder = os.path.join(date_folder, f"{stateCode}-{countryCode}")

    # City-Lat-Long folder
    city_folder = os.path.join(state_country_folder, f"{city_name}-{lat}-{long}")

    # Sanitize the search query to use it as part of the filename
    search_query = sanitize_search_query(queue['searchQuery'])

    # Final file path: {queue['searchQuery']}.json inside the city folder
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


def process_queue(queue, city, business_source_id):
    """Process Google Places API queue for the city"""
    city_name = city['name']
    city_stateCode = city['stateCode']
    city_countryCode = city['countryCode']
    lat = city['latitude']
    long = city['longitude']

    next_page_token = None

    # Setup the logger for the current queue processing
    logger = setup_logger(city_name, city_stateCode, city_countryCode, lat, long, queue)

    while True:
        try:
            # Fetch the first set of places from the API
            response = fetch_google_places(logger, lat, long, queue['searchQuery'], page_token=next_page_token)

            if response is None:
                logger.error("No response for search query: %s", queue['searchQuery'])
                break  # Skip this queue

            # Save or merge the response data
            save_data_to_file(logger, city_name, city_stateCode, city_countryCode, lat, long, response, queue)

            # Check if there's a next page token
            next_page_token = response.get('next_page_token')

            if not next_page_token:
                city_queue = {
                    "cityId": city["id"],
                    "queueId": queue["id"],
                    "businessSourceId": business_source_id,
                    "status": "Completed",
                }
                create_city_queue(request=city_queue)
                logger.info("Queue processing completed for: %s", queue['searchQuery'])
                break

            # If there's a next page, wait a short while before fetching the next set of results
            logger.info("Fetching next page of results for query: %s...", queue['searchQuery'])
            time.sleep(2)
        except Exception as e:
            while True:
                if is_internet_available(logger):
                    logger.error("Internet connection is working. Retrying...: %s", e)
                    break
                else:
                    logger.error("An error occurred while processing the queue: %s", e)
                    break  # Exit the retry loop


def google_places_scraper():
    try:
        # Initialize the global logger at the start of your script
        initialize_global_logger()
        
        logging.info("Find Places Scraper started.")

        login(os.environ.get("BACKEND_USER"), os.environ.get("BACKEND_USER_PASSWORD"))

        LIMIT = int(os.environ.get("MAX_WORKERS"))  # Number of queues to process per page
        business_source = get_business_source(sourceName=sourceValues[1])
        total_pages_queues = get_queue(limit=1)["totalPages"]
        total_pages_cities = get_cities(limit=LIMIT)["totalPages"]

        print(total_pages_queues, total_pages_cities)

        for city_page in range(1, total_pages_cities + 1):
            cities_response = get_cities(page=city_page, limit=LIMIT)
            if not cities_response["totalRecords"] > 0:
                logging.error("Failed to retrieve cities for city page %d.", city_page)
                continue

            for queue_page in range(1, total_pages_queues + 1):
                queue_is_empty = False

                with ThreadPoolExecutor(max_workers=LIMIT) as executor:
                    futures = []
                    for city in cities_response["cities"]:
                        # # Setup the logger for the current city
                        # city_logger = setup_city_logger(city['name'], city['stateCode'], city['countryCode'], city['latitude'], city['longitude'])

                        queues_response = get_queue(city_id=city['id'], business_source_Id=business_source['id'], page=queue_page, limit=1)
                        if len(queues_response["queues"]) < 1:
                            queue_is_empty = True
                            logging.info("No queues found for city: %s", city['name'])
                            break

                        for queue in queues_response["queues"]:
                            future = executor.submit(process_queue, queue, city, business_source["id"])
                            futures.append(future)

                # Wait for all threads to complete
                wait(futures)

                if queue_is_empty:
                    break

        logging.info("Google places scraper has finsihed working.")
    except Exception as e:
        logging.exception("An unhandled error occurred during google places scraper execution: %s", e)
