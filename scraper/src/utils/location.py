import re
import re
import pytz
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
            location = geolocator.reverse(
                location_point, exactly_one=True, language="en"
            )
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
                # zip_info = zip_db[number]
                # return zip_info.zip
                if len(number) >= 4:
                    return number
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


# Extract latitude and longitude from the URL
def extract_lat_lon(city, url):
    # Extract the latitude and longitude using regular expression
    pattern = r"@([-+]?\d+\.\d+),([-+]?\d+\.\d+)"
    match = re.search(pattern, url)
    if match:
        lat = match.group(1)
        lon = match.group(2)
        return float(lat), float(lon)
    return float(city["latitude"]), float(city["longitude"])
