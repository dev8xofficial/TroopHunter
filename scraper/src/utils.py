import os
import requests
import logging


# Place any utility/helper functions here
def check_business_existence(longitude, latitude, range):
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
            # Request successful
            return True
        else:
            # Request failed
            return False
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("Business existence check failed.")
