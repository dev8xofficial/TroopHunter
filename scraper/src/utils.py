import re
import pytz
import phonenumbers
import requests
from geopy.geocoders import Nominatim
from geopy.point import Point
from geopy.exc import GeocoderTimedOut
from pyzipcode import ZipCodeDatabase
from datetime import datetime, timedelta
import logging


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

    try:
        # Reverse geocoding to obtain address or place name
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
    except Exception as e:
        logging.exception("An error occurred during reverse geocoding: %s", e)

    return None


def get_location_details_from_zip(zip_code: str):
    geolocator = Nominatim(user_agent="my_app")

    try:
        # Geocode the zip code to obtain location details
        location = geolocator.geocode(zip_code, exactly_one=True)

        if location is not None:
            city = location.raw["address"].get("city")
            state = location.raw["address"].get("state")
            country = location.raw["address"].get("country")

            return {"city": city, "state": state, "country": country}
    except Exception as e:
        logging.exception("An error occurred during geocoding from zip code: %s", e)

    return None


def get_postal_code(address: str):
    try:
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

    except Exception as e:
        logging.exception("An error occurred while extracting postal code from address: %s", e)

    # If no valid postal code is found
    return None


def get_timezone_info(timezone):
    try:
        tz = pytz.timezone(timezone)
        now = datetime.now(pytz.utc).replace(tzinfo=None)
        now_localized = tz.localize(now)
        offset = now_localized.utcoffset()
        dst_info = now_localized.dst()

        utc_offset = str(offset.total_seconds() / 3600)
        dst = dst_info != timedelta(0)
        dst_offset = str(dst_info.total_seconds() / 3600)

        return {"utc_offset": utc_offset, "dst": dst, "dst_offset": dst_offset}
    except pytz.UnknownTimeZoneError as e:
        logging.exception("An error occurred while getting timezone info: %s", e)
        raise ValueError("Invalid timezone.")


def convert_to_24h_format(time_str):
    try:
        # Handle "Open 24 hours" case
        if time_str.lower() == "open 24 hours":
            return "00:00"

        # Remove any non-alphanumeric characters except ":" and whitespace
        time_str = re.sub(r"[^\w\s:]", "", time_str)

        # Handle "AM" and "PM" cases
        if "am" in time_str.lower() or "pm" in time_str.lower():
            # Extract hour and minute values
            match = re.search(r"(\d{1,2}):?(\d{2})?\s?(am|pm)", time_str.lower())
            if match:
                hour = int(match.group(1))
                minute = int(match.group(2)) if match.group(2) else 0
                period = match.group(3)
                if period == "pm" and hour < 12:
                    hour += 12
                elif period == "am" and hour == 12:
                    hour = 0
                return datetime.strptime(f"{hour}:{minute:02}", "%H:%M").strftime("%H:%M")

        # Handle 24-hour format
        match = re.search(r"(\d{1,2}):?(\d{2})?", time_str)
        if match:
            hour = int(match.group(1))
            minute = int(match.group(2)) if match.group(2) else 0
            return datetime.strptime(f"{hour}:{minute:02}", "%H:%M").strftime("%H:%M")

    except Exception as e:
        logging.exception("An error occurred while converting to 24-hour format: %s", e)

    # Return None if no valid time format is found
    return None


def get_cleaned_phone(phone: str):
    cleaned_phone = None
    try:
        if phone:
            cleaned_phone = re.sub(r"[^0-9+]", "", phone.replace("· ", ""))
            phone_obj = phonenumbers.parse(cleaned_phone, None)
            is_phone_valid = phonenumbers.is_valid_number(phone_obj)
            if not is_phone_valid:
                cleaned_phone = None
    except Exception as e:
        logging.exception("An error occurred while cleaning phone number: %s", e)

    return cleaned_phone


def is_internet_available():
    try:
        # Send a request to Google to check internet availability
        requests.get("https://www.google.com")
        return True
    except requests.exceptions.RequestException:
        return False
