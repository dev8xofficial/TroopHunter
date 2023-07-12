import json
import os
import requests
import logging


def check_business_existence(longitude: float, latitude: float, range: int):
    # Define the endpoint URL
    backend_url = os.environ.get("BACKEND_URL")
    url = f"{backend_url}/businesses"

    # Set the request headers
    token = os.environ.get("BACKEND_AUTHENTICATION")
    headers = {
        "Authorization": f"Bearer {token}",
    }

    # Set the request parameters
    params = {
        "longitude": longitude,
        "latitude": latitude,
        "range": range,
    }

    try:
        # Send the GET request to the endpoint
        response = requests.get(url, headers=headers, params=params)

        # Check the response status code
        if response.status_code == 200:
            if response.json()["totalRecords"] > 0:
                # Request successful
                return True
            else:
                return False
        else:
            # Request failed
            return False
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("Business existence check failed.")


def create_business(request: dict):
    # Define the endpoint URL
    backend_url = os.environ.get("BACKEND_URL")
    url = f"{backend_url}/businesses"

    # Set the request headers
    token = os.environ.get("BACKEND_AUTHENTICATION")
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    try:
        # Send the GET request to the endpoint
        response = requests.post(url, headers=headers, data=json.dumps(request))

        # Check the response status code
        if response.status_code == 201:
            return response.json()
        else:
            # Request failed
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("Business existence check failed.")
