import json
import os
import requests
import logging
from src.services.auth import refreshToken
from dotenv import load_dotenv


def get_queue(city_id="", page=1, limit=5):
    try:
        load_dotenv()
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/queues"

        # Set the request headers
        token = os.environ.get("ACCESS_TOKEN")
        headers = {
            "Authorization": f"Bearer {token}",
        }

        # Set the request parameters
        params = {
            "cityId": city_id,
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
            if jsonResponse["status"] == 406:
                refreshToken()
                get_queue(page, limit)
            logging.error("Failed to retrieve queue. Status code: %s, Response: %s", jsonResponse["status"], jsonResponse["error"])
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while retrieving the queue: %s", e)


def update_queue(request: dict):
    try:
        load_dotenv()
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/queues/{request['id']}"

        # Set the request headers
        token = os.environ.get("ACCESS_TOKEN")
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

        # Send the PUT request to the endpoint
        response = requests.put(url, headers=headers, data=json.dumps(request))
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            return response.json()
        else:
            if jsonResponse["status"] == 406:
                refreshToken()
                update_queue(request)
            logging.error("Failed to update the queue. Status code: %s, Response: %s", jsonResponse["status"], jsonResponse["error"])
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while updating the queue: %s", e)

def create_city_queue(request: dict):
    try:
        load_dotenv()
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/city-queues"

        # Set the request headers
        token = os.environ.get("ACCESS_TOKEN")
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

        # Send the PUT request to the endpoint
        response = requests.post(url, headers=headers, data=json.dumps(request))
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            return response.json()
        else:
            if jsonResponse["status"] == 406:
                refreshToken()
                create_city_queue(request)
            logging.error("Failed to create the city queue. Status code: %s, Response: %s", jsonResponse["status"], jsonResponse["error"])
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while creating the city queue: %s", e)
