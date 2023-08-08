import os
import requests
import logging


def get_cities(page=1, limit=5):
    try:
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/cities/search"

        # Set the request headers
        token = os.environ.get("BACKEND_AUTHENTICATION")
        headers = {
            "Authorization": f"Bearer {token}",
        }

        # Set the request parameters
        params = {
            "name": "San Francisco",
            "stateCode": "CA",
            "countryCode": "US",
            "page": page,
            "limit": limit,
        }

        # Send the GET request to the endpoint
        response = requests.get(url, headers=headers, params=params)
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            return response.json()["data"]
        else:
            # Request failed
            logging.error("Failed to retrieve cities. Status code: %s, Response: %s", jsonResponse["status"], jsonResponse["error"])
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while retrieving the cities: %s", e)