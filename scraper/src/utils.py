import os
import requests
import logging
import phonenumbers
from phonenumbers import PhoneNumberType

from geopy.geocoders import Nominatim
from geopy.point import Point
from geopy.exc import GeocoderTimedOut
import re
from pyzipcode import ZipCodeDatabase
import pytz
from geopy import exc
from datetime import datetime, timedelta


# Place any utility/helper functions here
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


def get_location_details(latitude: float, longitude: float, address: str):
    geolocator = Nominatim(user_agent="my_app")

    def reverse_geocode(lat, lon):
        location = None
        location_point = Point(lat, lon)
        try:
            location = geolocator.reverse(location_point, exactly_one=True, language="en")
        except GeocoderTimedOut:
            return reverse_geocode(lat, lon)  # Retry in case of timeout
        return location

    def geocode(address):
        location = None
        try:
            location = geolocator.geocode(address, language="en")
        except GeocoderTimedOut:
            return geocode(address)  # Retry in case of timeout
        return location

    # # Step 1: Reverse geocoding to obtain address or place name
    # reverse_location = reverse_geocode(latitude, longitude)

    # if reverse_location is not None:
    #     geocode_address = reverse_location.address

    #     # Step 2: Forward geocoding with obtained address or place name for accurate location details
    #     location = geocode(geocode_address, language="en")

    #     if location is not None:
    #         postal_code = location.raw["address"].get("postcode")
    #         city = location.raw["address"].get("city")
    #         state = location.raw["address"].get("state")
    #         country = location.raw["address"].get("country")

    #         return {
    #             "postal_code": postal_code,
    #             "city": city,
    #             "state": state,
    #             "country": country,
    #         }

    reverse_location = reverse_geocode(latitude, longitude)

    if reverse_location is not None:
        postal_code = reverse_location.raw["address"].get("postcode")
        city = reverse_location.raw["address"].get("city")
        state = reverse_location.raw["address"].get("state")
        country = reverse_location.raw["address"].get("country")

        return {
            "postal_code": postal_code,
            "city": city,
            "state": state,
            "country": country,
        }

    return None


def get_location_details_from_zip(zip_code: str):
    geolocator = Nominatim(user_agent="my_app")
    location = geolocator.geocode(zip_code, exactly_one=True)

    if location is not None:
        city = location.raw["address"].get("city")
        state = location.raw["address"].get("state")
        country = location.raw["address"].get("country")

        return {"city": city, "state": state, "country": country}
    else:
        return None


def get_postal_code(address: str):
    # Remove special characters from the address
    address_cleaned = re.sub(r"[^\w\s]", "", address)

    # Extract numbers from the cleaned address
    numbers = re.findall(r"\d+", address_cleaned)

    # Initialize the ZipCodeDatabase object
    zip_db = ZipCodeDatabase()

    # Check if each number is a valid postal code
    for number in numbers:
        try:
            zip_info = zip_db[number]
            return zip_info.zip
        except KeyError:
            pass

    # If no valid postal code is found
    return None


def get_timezone_info(timezone):
    try:
        tz = pytz.timezone(timezone)
        now = datetime.now(pytz.utc).replace(tzinfo=None)
        now_localized = tz.localize(now)
        offset = now_localized.utcoffset()
        dst_info = now_localized.dst()

        utc_offset = offset.total_seconds() / 3600
        dst = dst_info != timedelta(0)
        dst_offset = dst_info.total_seconds() / 3600

        return {"utc_offset": utc_offset, "dst": dst, "dst_offset": dst_offset}
    except pytz.UnknownTimeZoneError:
        raise ValueError("Invalid timezone.")
