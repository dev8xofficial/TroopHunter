import json
import os
import requests
import logging


def get_queue(page=1, limit=5):
    try:
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/queues"

        # Set the request headers
        token = os.environ.get("BACKEND_AUTHENTICATION")
        headers = {
            "Authorization": f"Bearer {token}",
        }

        # Set the request parameters
        params = {
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
            logging.error("Failed to retrieve queue. Status code: %s, Response: %s", jsonResponse["status"], jsonResponse["error"])
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while retrieving the queue: %s", e)


def update_queue(request: dict):
    try:
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/queues/{request['id']}"

        # Set the request headers
        token = os.environ.get("BACKEND_AUTHENTICATION")
        headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

        # Send the PUT request to the endpoint
        response = requests.put(url, headers=headers, data=json.dumps(request))
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            return response.json()
        else:
            # Request failed
            logging.error("Failed to update the queue. Status code: %s, Response: %s", jsonResponse["status"], jsonResponse["error"])
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while updating the queue: %s", e)
