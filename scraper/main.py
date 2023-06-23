from src.scraper import BusinessScraper
from config import QUERIES, OUTPUT_FILE

def main():
    # Create an instance of the BusinessScraper
    scraper = BusinessScraper()

    # Scrape data for each query
    for query in QUERIES:
        scraper.search(query)
        scraper.scroll_and_extract_data()

    # Save the extracted data to a CSV file
    scraper.save_to_csv(output_file=OUTPUT_FILE)

if __name__ == "__main__":
    main()
