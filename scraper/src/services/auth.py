import json
import os
import requests
import logging
from dotenv import load_dotenv


def login(email, password):
    try:
        load_dotenv()
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        url = f"{backend_url}/auth/signin"

        # Set the request headers
        headers = {"Content-Type": "application/json"}

        # Set the request parameters
        request = {
            "email": email,
            "password": password,
        }

        # Send the GET request to the endpoint
        response = requests.post(url, headers=headers, data=json.dumps(request))
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            data = response.json()["data"]
            os.environ["ACCESS_TOKEN"] = data["accessToken"]
            os.environ["REFRESH_TOKEN"] = data["refreshToken"]
        else:
            # Request failed
            logging.error(
                "Failed to login. Status code: %s, Response: %s",
                jsonResponse["status"],
                jsonResponse["error"],
            )
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while login: %s", e)


def refreshToken():
    try:
        load_dotenv()
        # Define the endpoint URL
        backend_url = os.environ.get("BACKEND_URL")
        refreshToken = os.environ.get("REFRESH_TOKEN")
        url = f"{backend_url}/auth/refresh-token"

        # Set the request headers
        headers = {"Content-Type": "application/json"}

        # Set the request parameters
        request = {
            "refreshToken": refreshToken,
        }

        # Send the GET request to the endpoint
        response = requests.post(url, headers=headers, data=json.dumps(request))
        jsonResponse = response.json()

        # Check the response status code
        if jsonResponse["success"]:
            data = response.json()["data"]
            os.environ["ACCESS_TOKEN"] = data["accessToken"]
        else:
            # Request failed
            if jsonResponse["status"] == 407:
                login(
                    os.environ.get("BACKEND_USER"),
                    os.environ.get("BACKEND_USER_PASSWORD"),
                )
            logging.error(
                "Failed to login. Status code: %s, Response: %s",
                jsonResponse["status"],
                jsonResponse["error"],
            )
            return None
    except requests.exceptions.RequestException as e:
        # Request encountered an error
        logging.error("An error occurred while login: %s", e)
