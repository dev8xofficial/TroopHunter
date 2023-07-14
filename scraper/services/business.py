import json
import os
import requests
import logging
import re


def check_business_existence(name: str = None, category: str = None, address: str = None, phone: str = None, includes: list[str] = []):
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
        "name": name,
        "includes": includes,
    }

    try:
        # Send the GET request to the endpoint
        response = requests.get(url, headers=headers, params=params)
        result = False

        # Check the response status code
        if response.status_code == 200:
            if response.json()["totalRecords"] > 0:
                for business in response.json()["businesses"]:
                    if name == None:
                        result = False
                        break
                    elif business["name"] == name:
                        result = True

                    if category != None and business["businessDomain"] == category:
                        result = True

                    if address != None and address.replace("· ", "") in business["address"]:
                        result = True

                    if phone != None and business["BusinessPhone"]["number"] == phone:
                        result = True
        return result
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
        logging.error("Failed to create a business.")
