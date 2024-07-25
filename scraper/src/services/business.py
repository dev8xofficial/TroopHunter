import json
import os
import requests
import logging
from src.services.auth import refreshToken
from dotenv import load_dotenv


def check_business_existence(name: str = None, category: str = None, address: str = None, phone: str = None, include: list[str] = []):
    try:
        load_dotenv()
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/businesses/search"

        # Set the request headers
        token = os.environ.get("ACCESS_TOKEN")
        headers = {
            "Authorization": f"Bearer {token}",
        }

        # Set the request parameters
        params = {
            "page": 1,
            "limit": 10,
            "name": name,
            "include": include,
        }

        # Send the GET request to the endpoint
        response = requests.get(url, headers=headers, params=params)
        result = False
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            data = response.json()["data"]
            if data["totalRecords"] > 0:
                for businessId in data["businesses"]:
                    business = data["businesses"][businessId]
                    if name is None:
                        result = False
                        break
                    elif business is not None and business.get("name") == name:
                        result = True

                    if (category is not None and business is not None and business.get("businessDomain") == category):
                        result = True

                    if (address is not None and business is not None and address.replace("· ", "") in business.get("address", "")):
                        result = True

                    if (phone is not None and business is not None and business.get("BusinessPhone") is not None and business["BusinessPhone"].get("number") is not None and business["BusinessPhone"]["number"] == phone ):
                        result = True
        else:
            if jsonResponse["status"] == 406:
                refreshToken()
                check_business_existence(name, category, address, phone, include)
        return result
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while checking business existence: %s", e)


def create_business(request: dict):
    try:
        load_dotenv()
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/businesses"

        # Set the request headers
        token = os.environ.get("ACCESS_TOKEN")
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

        # Send the POST request to the endpoint
        response = requests.post(url, headers=headers, data=json.dumps(request))
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            return response.json()
        else:
            if jsonResponse["status"] == 406:
                refreshToken()
                create_business(request)
            logging.error( "Failed to create a business. Status code: %s, Response: %s", jsonResponse["status"], jsonResponse["error"])
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while creating a business: %s", e)

def create_businesses(request: list):
    try:
        load_dotenv()
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/businesses/bulk"

        # Set the request headers
        token = os.environ.get("ACCESS_TOKEN")
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

        # Send the POST request to the endpoint
        response = requests.post(url, headers=headers, data=json.dumps(request))
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            return response.json()
        else:
            if jsonResponse["status"] == 406:
                refreshToken()
                create_businesses(request)
            logging.error( "Failed to create businesses in bulk. Status code: %s, Response: %s", jsonResponse["status"], jsonResponse["error"])
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while creating businesses in bulk: %s", e)
