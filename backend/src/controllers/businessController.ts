import { Request, Response } from 'express';
import casual from 'casual';
import { faker } from '@faker-js/faker';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
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
import { SocialMediaAttributes } from '../types/businessSocialMedia';
import { BusinessPhotoAttributes } from '../types/businessPhoto';
import Business from '../models/Business';
import BusinessCategory from '../models/BusinessCategory';
import PostalCode from '../models/PostalCode';
import BusinessPhone from '../models/BusinessPhone';
import BusinessSocialMedia from '../models/BusinessSocialMedia';
import Timezone from '../models/Timezone';
import Location from '../models/Location';
import BusinessRating from '../models/BusinessRating';
import BusinessSource from '../models/BusinessSource';
import BusinessOpeningHour from '../models/BusinessOpeningHour';
import BusinessClosingHour from '../models/BusinessClosingHour';
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

export const createBusinesses = async (req: Request, res: Response) => {
  try {
    const count = parseInt(req.body.count);
    const businessesArray: any[] = [];

    const values: string[] = ['Corporation', 'Limited liability company', 'Retail', 'Retail Estate', 'Cooperative', 'Marketing', 'Advertising', 'Finance', 'Nonprofit Organization', 'Agriculture', 'S corporation', 'C corporation', 'Construction', 'Manufacturing', 'Restaurant', 'Investing', 'Limited Company', 'Financial Services', 'Bank', 'Food Service', 'Convenience Store', 'Bakery'];
    const cities = [
      { name: 'New York', state: 'New York', country: 'United States', postalCode: '10001' },
      { name: 'San Francisco', state: 'California', country: 'United States', postalCode: '94101' },
      { name: 'London', state: 'London', country: 'United Kingdom', postalCode: 'SW1A 1AA' },
      { name: 'Berlin', state: 'Berlin', country: 'Germany', postalCode: '10115' },
      { name: 'Sydney', state: 'New South Wales', country: 'Australia', postalCode: '2000' },
    ];
    const opValues: string[] = ['open', 'close', 'temporarily-close'];
    const sValues: string[] = ['google-maps', 'google', 'facebook'];
    const phone = getPhoneWithDetails('+14154005153');

    for (let i = 0; i < count; i++) {
      const city = cities[Math.floor(Math.random() * 5)];
      const businessId = uuidv4();

      const businessData = {
        id: businessId,
        name: faker.company.name(),
        businessDomain: faker.company.catchPhrase(),
        category: {
          id: uuidv4(),
          name: values[Math.floor(Math.random() * 21)],
        },
        location: {
          id: uuidv4(),
          city: city.name,
          state: city.state,
          country: city.country,
        },
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        postalCode: {
          id: uuidv4(),
          code: city.postalCode,
        },
        address: faker.location.streetAddress(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        reviews: faker.number.float({ min: 1, max: 5000 }),
        source: {
          id: uuidv4(),
          sourceName: sValues[Math.floor(Math.random() * 3)],
        },
        phone: {
          id: uuidv4(),
          countryCode: phone?.countryCode,
          regionCode: phone?.regionCode,
          number: phone?.number,
          numberNationalFormatted: phone?.numberNationalFormatted,
          numberInternationalFormatted: phone?.numberInternationalFormatted,
          numberType: phone?.numberType,
          isValid: phone?.isValid,
        },
        rating: {
          id: uuidv4(),
          ratingValue: faker.number.float({ min: 1, max: 5, precision: 1 }),
          businessDomain: faker.lorem.words(3),
        },
        timezone: {
          id: uuidv4(),
          timezoneName: faker.location.timeZone(),
          utcOffset: faker.number.int({ min: -12, max: 12 }).toString(),
          dst: faker.datatype.boolean(),
          dstOffset: faker.number.int({ min: -12, max: 12 }).toString(),
          countryCode: faker.location.countryCode(),
        },
        socialMedia: {
          id: uuidv4(),
          businessId: businessId,
          facebookProfile: faker.internet.url(),
          twitterProfile: faker.internet.url(),
          instagramProfile: faker.internet.url(),
          linkedInProfile: faker.internet.url(),
          youTubeProfile: faker.internet.url(),
        },
        photos: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
          id: uuidv4(),
          businessId: businessId,
          photoUrl: faker.image.urlPicsumPhotos(),
          businessDomain: faker.image.urlPlaceholder(),
        })),
        openingHour: {
          id: uuidv4(),
          time: casual.time('HH:mm'),
        },
        closingHour: {
          id: uuidv4(),
          time: casual.time('HH:mm'),
        },
      };

      businessesArray.push(businessData);
    }

    const businesses = createBulkBusinesses(businessesArray);

    if (businesses) {
      res.json(businesses);
    } else {
      res.status(404).json({ error: 'RBusinesses failed to create' });
    }
  } catch (error) {
    console.error('Error retrieving business:', error);
    res.status(500).json({ error: 'Failed to create RBusinesses' });
  }
};

export const createBusiness = async (req: Request, res: Response) => {
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

    console.log('Required parameters: ', name, category, longitude, latitude, source);

    // if (!name && !longitude && !latitude && !source) return;

    if (category) {
      const categoryFromDB: BusinessCategoryAttributes | undefined = await findOrCreateBusinessCategory(category);
      payload.categoryId = categoryFromDB?.id;
    }

    if (location) {
      const locationFromDB: LocationAttributes | undefined = await findOrCreateLocation(location);
      payload.locationId = locationFromDB?.id;
    }

    if (postalCode) {
      const postalCodeFromDB: PostalCodeAttributes | undefined = await findOrCreatePostalCode(postalCode);
      payload.postalCodeId = postalCodeFromDB?.id;
    }

    if (phone) {
      const phoneWithDetails = getPhoneWithDetails(phone);
      const phoneFromDB: PhoneAttributes | undefined = await findOrCreateBusinessPhone(phoneWithDetails);
      payload.phoneId = phoneFromDB?.id;
    }

    if (rating !== undefined || rating !== null) {
      const ratingFromDB: RatingAttributes | undefined = await findOrCreateBusinessRating(rating);
      payload.ratingId = ratingFromDB?.id;
    }

    if (source) {
      const sourceFromDB: SourceAttributes | undefined = await findOrCreateBusinessSource(source);
      payload.sourceId = sourceFromDB?.id;
    }

    if (timezone) {
      const timezoneFromDB: TimezoneAttributes | undefined = await findOrCreateTimezone(timezone);
      payload.timezoneId = timezoneFromDB?.id;
    }

    if (openingHour) {
      const openingHourFromDB: OpeningTimeAttributes | undefined = await findOrCreateBusinessOpeningHour(openingHour);
      payload.openingHourId = openingHourFromDB?.id;
    }

    if (closingHour) {
      const closingHourFromDB: ClosingTimeAttributes | undefined = await findOrCreateBusinessClosingHour(closingHour);
      payload.closingHourId = closingHourFromDB?.id;
    }

    const business = await Business.create(payload);

    res.status(201).json(business);
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ error: 'Failed to create business' });
  }
};

export const getBusinesses = async (req: Request, res: Response) => {
  const { name, businessDomain, categoryId, address, locationId, longitude, latitude, range, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, socialMediaId, openingHourId, closingHourId, page, limit } = req.query;

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

  console.log('getBusinesses: ', req.body, req.params, req.query, whereClause);
  try {
    const { count, rows: businesses } = await Business.findAndCountAll({
      where: whereClause,
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

async function createBulkBusinesses(businessData: any[]) {
  const transaction = await Sequelize.transaction();

  try {
    const categories: Partial<BusinessCategoryAttributes>[] = [];
    const locations: Partial<LocationAttributes>[] = [];
    const postalCodes: PostalCodeAttributes[] = [];
    const phones: Partial<PhoneAttributes>[] = [];
    const ratings: Partial<RatingAttributes>[] = [];
    const sources: Partial<SourceAttributes>[] = [];
    const timezones: Partial<TimezoneAttributes>[] = [];
    const socialMedias: Partial<SocialMediaAttributes>[] = [];
    const photos: Partial<BusinessPhotoAttributes>[][] = [];
    const openingHours: Partial<OpeningTimeAttributes>[] = [];
    const closingHours: Partial<ClosingTimeAttributes>[] = [];
    const businesses: BusinessAttributes[] = [];

    businessData.map(async (data: any) => {
      categories.push(data.category);
      locations.push(data.location);
      postalCodes.push(data.postalCode);
      phones.push(data.phone);
      ratings.push(data.rating);
      sources.push(data.source);
      timezones.push(data.timezone);
      socialMedias.push(data.socialMedia);
      photos.push(data.photos);
      openingHours.push(data.openingHour);
      closingHours.push(data.closingHour);

      businesses.push({
        name: data.name,
        businessDomain: data.businessDomain,
        categoryId: data.category.id,
        locationId: data.location.id,
        geoPoint: { type: 'Point', coordinates: [data.longitude, data.latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } },
        longitude: data.longitude,
        latitude: data.latitude,
        postalCodeId: data.postalCode.id,
        address: data.address,
        email: data.email,
        website: data.website,
        reviews: data.reviews,
        sourceId: data.source.id,
        phoneId: data.phone.id,
        ratingId: data.rating.id,
        timezoneId: data.timezone.id,
        openingHourId: data.openingHour.id,
        closingHourId: data.closingHour.id,
      });
    });

    await BusinessCategory.bulkCreate(categories, { transaction });
    await Location.bulkCreate(locations, { transaction });
    await PostalCode.bulkCreate(postalCodes, { transaction });
    await BusinessPhone.bulkCreate(phones, { transaction });
    await BusinessRating.bulkCreate(ratings, { transaction });
    await BusinessSource.bulkCreate(sources, { transaction });
    await Timezone.bulkCreate(timezones, { transaction });
    await BusinessOpeningHour.bulkCreate(openingHours, { transaction });
    await BusinessClosingHour.bulkCreate(closingHours, { transaction });

    const uk = await Business.bulkCreate(businesses, { transaction });
    await BusinessSocialMedia.bulkCreate(socialMedias, { transaction });
    // await BusinessPhoto.bulkCreate(photos.flat(), { transaction });

    await transaction.commit().then(() => {
      return uk;
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
