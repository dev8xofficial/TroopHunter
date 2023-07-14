from src.scraper import BusinessScraper
from config import LOCATIONS, OUTPUT_FILE, LAPTOP_NAME
import logging
import datetime
from dotenv import load_dotenv
from services.queue import get_queue, update_queue
from concurrent.futures import ThreadPoolExecutor

# Load environment variables from .env file
load_dotenv()

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


def process_queue(queue, location):
    try:
        scraper = BusinessScraper()
        scraper.search(f"{queue['searchQuery']} in {', '.join(dict((key, value) for key, value in location.items() if key != 'timezone' and key != 'countryCode').values())}")
        scraper.scroll_and_extract_data(queue["searchQuery"], location)

        queue["status"] = "Completed"
        update_queue(request=queue)
        logging.info(f"Search for '{queue['searchQuery']}' in {location} completed.")
    except Exception as e:
        logging.exception(f"An error occurred during search execution for '{queue['searchQuery']}' in {location}: {e}")


def main():
    logging.info("Scraping process started.")

    QUEUES = get_queue()

    # Create a ThreadPoolExecutor with a maximum of 5 threads
    with ThreadPoolExecutor(max_workers=1) as executor:
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
                executor.submit(process_queue, queue, location)

    logging.info("Scraping process completed.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        logging.exception("An unhandled error occurred during scraper execution: %s", e)
