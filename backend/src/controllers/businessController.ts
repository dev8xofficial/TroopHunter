import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Sequelize from '../config/database';
import { BusinessAttributes } from '../types/business';
import { BusinessCategoryAttributes } from '../types/businessCategory';
import { LocationAttributes } from '../types/location';
import { RatingAttributes } from '../types/businessRating';
import { SourceAttributes } from '../types/businessSource';
import { OpeningTimeAttributes } from '../types/businessOpeningHour';
import { ClosingTimeAttributes } from '../types/businessClosingHour';
import { PostalCodeAttributes } from '../types/postalCode';
import { PhoneAttributes } from '../types/businessPhone';
import { TimezoneAttributes } from '../types/timezone';
import Business from '../models/Business';
import { Point } from 'geojson';
import { findOrCreateBusinessPhone, getPhoneWithDetails } from '../utils/phone';
import { findOrCreateBusinessSource } from '../utils/business';
import { findOrCreateBusinessCategory } from '../utils/category';
import { findOrCreateLocation } from '../utils/location';
import { findOrCreatePostalCode } from '../utils/postalCode';
import { findOrCreateBusinessRating } from '../utils/rating';
import { findOrCreateTimezone } from '../utils/timezone';
import { findOrCreateBusinessOpeningHour } from '../utils/openingHour';
import { findOrCreateBusinessClosingHour } from '../utils/closingHour';
// import BusinessPhoto from '../models/BusinessPhoto';

export const createBusiness = async (req: Request, res: Response) => {
  const transaction = await Sequelize.transaction(); // Start a transaction

  try {
    const { name, businessDomain, category, address, location, longitude, latitude, postalCode, phone, email, website, rating, reviews, timezone, source, socialMediaId, openingHour, closingHour } = req.body;
    const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };
    let payload: BusinessAttributes = {
      name,
      businessDomain,
      address,
      geoPoint,
      longitude,
      latitude,
      email,
      website,
      reviews,
      socialMediaId,
    };

    console.log('Required parameters:', name, category, longitude, latitude, source);

    // if (!name && !longitude && !latitude && !source) return;

    if (category) {
      const categoryFromDB: BusinessCategoryAttributes | undefined = await findOrCreateBusinessCategory(category, transaction);
      payload.categoryId = categoryFromDB?.id;
    }

    if (location) {
      const locationFromDB: LocationAttributes | undefined = await findOrCreateLocation(location, transaction);
      payload.locationId = locationFromDB?.id;
    }

    if (postalCode) {
      const postalCodeFromDB: PostalCodeAttributes | undefined = await findOrCreatePostalCode(postalCode, transaction);
      payload.postalCodeId = postalCodeFromDB?.id;
    }

    if (phone) {
      const phoneWithDetails = getPhoneWithDetails(phone);
      const phoneFromDB: PhoneAttributes | undefined = await findOrCreateBusinessPhone(phoneWithDetails, transaction);
      payload.phoneId = phoneFromDB?.id;
    }

    if (rating !== undefined || rating !== null) {
      const ratingFromDB: RatingAttributes | undefined = await findOrCreateBusinessRating(rating, transaction);
      payload.ratingId = ratingFromDB?.id;
    }

    if (source) {
      const sourceFromDB: SourceAttributes | undefined = await findOrCreateBusinessSource(source, transaction);
      payload.sourceId = sourceFromDB?.id;
    }

    if (timezone) {
      const timezoneFromDB: TimezoneAttributes | undefined = await findOrCreateTimezone(timezone, transaction);
      payload.timezoneId = timezoneFromDB?.id;
    }

    if (openingHour) {
      const openingHourFromDB: OpeningTimeAttributes | undefined = await findOrCreateBusinessOpeningHour(openingHour, transaction);
      payload.openingHourId = openingHourFromDB?.id;
    }

    if (closingHour) {
      const closingHourFromDB: ClosingTimeAttributes | undefined = await findOrCreateBusinessClosingHour(closingHour, transaction);
      payload.closingHourId = closingHourFromDB?.id;
    }

    const business = await Business.create(payload, { transaction });

    await transaction.commit().then(() => {
      return business;
    });

    res.status(201).json(business);
  } catch (error) {
    console.error('Error creating business:', error);

    // Rollback the transaction if an error occurred
    await transaction.rollback();

    res.status(500).json({ error: 'Failed to create business' });
  }
};

export const getBusinesses = async (req: Request, res: Response) => {
  const { name, businessDomain, categoryId, address, locationId, longitude, latitude, range, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, openingHourId, closingHourId, page, limit, includes } = req.query;

  const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (businessDomain) {
    whereClause.businessDomain = { [Op.iLike]: `%${businessDomain}%` };
  }

  if (categoryId) {
    whereClause.categoryId = categoryId;
  }

  if (address) {
    whereClause.address = address;
  }

  if (locationId) {
    whereClause.locationId = locationId;
  }

  if (latitude && longitude && range) {
    const point: Point = {
      type: 'Point',
      coordinates: [parseFloat(longitude as string), parseFloat(latitude as string)],
    };

    whereClause.geoPoint = Sequelize.literal(`ST_DWithin("Business"."geoPoint", ST_SetSRID(ST_MakePoint(${point.coordinates[0]}, ${point.coordinates[1]}), 4326), ${range})`);
    whereClause.longitude = longitude;
    whereClause.latitude = latitude;
  }

  if (postalCodeId) {
    whereClause.postalCodeId = postalCodeId;
  }

  if (phoneId) {
    whereClause.phoneId = phoneId;
  }

  if (email) {
    whereClause.email = email;
  }

  if (website) {
    whereClause.website = {
      [Op.eq]: website,
    };
  }

  if (timezoneId) {
    whereClause.timezoneId = timezoneId;
  }

  if (openingHourId) {
    whereClause.openingHourId = openingHourId;
  }

  if (closingHourId) {
    whereClause.closingHourId = closingHourId;
  }

  const paginationOptions: { [key: string]: number } = {};

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (!isNaN(pageNumber) && pageNumber > 0) {
    paginationOptions.offset = (pageNumber - 1) * limitNumber;
  }

  if (!isNaN(limitNumber) && limitNumber > 0) {
    paginationOptions.limit = limitNumber;
  }

  try {
    const { count, rows: businesses } = await Business.findAndCountAll({
      where: whereClause,
      include: includes,
      ...paginationOptions,
    });

    const totalPages = Math.ceil(count / limitNumber);

    res.json({
      totalRecords: count,
      totalPages,
      businesses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving businesses.' });
  }
};

export const getBusinessById = async (req: Request, res: Response) => {
  console.log('getBusinessById: ');
  const { id } = req.params;
  try {
    const business = await Business.findOne({ where: { id } });
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    res.json(business);
  } catch (error) {
    console.error('Error retrieving business:', error);
    res.status(500).json({ error: 'Failed to retrieve business' });
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { name, businessDomain, categoryId, address, locationId, longitude, latitude, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, openingHourId, closingHourId } = req.body;
    const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };

    const business = await Business.findByPk(id);

    if (business) {
      business.name = name;
      business.businessDomain = businessDomain;
      business.categoryId = categoryId;
      business.address = address;
      business.locationId = locationId;
      business.longitude = longitude;
      business.latitude = latitude;
      business.geoPoint = geoPoint;
      business.postalCodeId = postalCodeId;
      business.phoneId = phoneId;
      business.email = email;
      business.website = website;
      business.ratingId = ratingId;
      business.reviews = reviews;
      business.timezoneId = timezoneId;
      business.sourceId = sourceId;
      business.socialMediaId = socialMediaId;
      business.openingHourId = openingHourId;
      business.closingHourId = closingHourId;

      await business.save();

      res.json(business);
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  } catch (error) {
    console.error('Error updating business:', error);
    res.status(500).json({ error: 'Failed to update business' });
  }
};

export const deleteBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const business = await Business.findByPk(id);
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    await business.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting business:', error);
    res.status(500).json({ error: 'Failed to delete business' });
  }
};
