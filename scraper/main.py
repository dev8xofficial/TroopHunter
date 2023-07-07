from src.scraper import BusinessScraper
from config import CITIES, OUTPUT_FILE
from queries.chatgpt import QUERIES_CHATGPT
import logging
import datetime
from dotenv import load_dotenv

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


def main():
    # Create an instance of the BusinessScraper
    scraper = BusinessScraper()

    for city in CITIES:
        for query in QUERIES_CHATGPT:
            scraper.search(f"{query} in {city}")
            scraper.scroll_and_extract_data()

    scraper.save_to_csv(output_file=OUTPUT_FILE)


if __name__ == "__main__":
    try:
        logging.info("Scraping process started.")
        main()
        logging.info("Scraping process completed.")
    except Exception as e:
        logging.exception("An unhandled error occurred during scraper execution: %s", e)
