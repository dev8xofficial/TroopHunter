import os
import requests
import logging
from src.services.auth import refreshToken
from dotenv import load_dotenv


def get_countries(code):
    try:
        load_dotenv()
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/countries/search"

        # Set the request headers
        token = os.environ.get("ACCESS_TOKEN")
        headers = {
            "Authorization": f"Bearer {token}",
        }

        # Set the request parameters
        params = {
            "code": code,
            "page": 1,
            "limit": 1,
        }

        # Send the GET request to the endpoint
        response = requests.get(url, headers=headers, params=params)
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            return response.json()["data"]
        else:
            if jsonResponse["status"] == 406:
                refreshToken()
                get_countries(code)
            logging.error(
                "Failed to retrieve countries. Status code: %s, Response: %s",
                jsonResponse["status"],
                jsonResponse["error"],
            )
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while retrieving the countries: %s", e)
