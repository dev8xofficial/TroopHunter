import json
import os
import requests
import logging
from src.services.auth import refreshToken
from dotenv import load_dotenv


def get_business_source(sourceName=""):
    try:
        load_dotenv()
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/business-sources/{sourceName}"

        # Set the request headers
        token = os.environ.get("ACCESS_TOKEN")
        headers = {
            "Authorization": f"Bearer {token}",
        }

        # Send the GET request to the endpoint
        response = requests.get(url, headers=headers)
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            return response.json()["data"]
        else:
            if jsonResponse["status"] == 406:
                refreshToken()
                get_business_source(sourceName)
            logging.error("Failed to retrieve business source. Status code: %s, Response: %s", jsonResponse["status"], jsonResponse["error"])
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while retrieving the business source: %s", e)