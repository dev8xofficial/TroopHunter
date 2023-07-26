import json
import os
import requests
import logging


def check_business_existence(name: str = None, category: str = None, address: str = None, phone: str = None, include: list[str] = []):
    try:
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/businesses/search"

        # Set the request headers
        token = os.environ.get("BACKEND_AUTHENTICATION")
        headers = {
            "Authorization": f"Bearer {token}",
        }

        # Set the request parameters
        params = {
            "name": name,
            "include": include,
        }

        # Send the GET request to the endpoint
        response = requests.get(url, headers=headers, params=params)
        result = False

        # Check the response status code
        if response.status_code == 200:
            data = response.json()
            if data["totalRecords"] > 0:
                for business in data["businesses"]:
                    if name is None:
                        result = False
                        break
                    elif business is not None and business.get("name") == name:
                        result = True

                    if category is not None and business is not None and business.get("businessDomain") == category:
                        result = True

                    if address is not None and business is not None and address.replace("· ", "") in business.get("address", ""):
                        result = True

                    if phone is not None and business is not None and business.get("BusinessPhone") is not None and business["BusinessPhone"].get("number") is not None and business["BusinessPhone"]["number"] == phone:
                        result = True
        return result
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while checking business existence: %s", e)


def create_business(request: dict):
    try:
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/businesses"

        # Set the request headers
        token = os.environ.get("BACKEND_AUTHENTICATION")
        headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

        # Send the POST request to the endpoint
        response = requests.post(url, headers=headers, data=json.dumps(request))

        # Check the response status code
        if response.status_code == 201:
            return response.json()
        else:
            # Request failed
            logging.error("Failed to create a business. Status code: %s, Response: %s", response.status_code, response.text)
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while creating a business: %s", e)
