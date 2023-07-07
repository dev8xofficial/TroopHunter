import { Request, Response } from 'express';
import casual from 'casual';
import { faker } from '@faker-js/faker';
import { Op, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database';
import { BusinessAttributes } from '../types/business';
import { BusinessCategoryAttributes } from '../types/businessCategory';
import { LocationAttributes } from '../types/location';
import { OperatingStatusAttributes } from '../types/businessOperatingStatus';
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
import BusinessOperatingStatus from '../models/BusinessOperatingStatus';
import BusinessRating from '../models/BusinessRating';
import BusinessSource from '../models/BusinessSource';
import BusinessOpeningHour from '../models/BusinessOpeningHour';
import BusinessClosingHour from '../models/BusinessClosingHour';
import { Point } from 'geojson';
// import BusinessPhoto from '../models/BusinessPhoto';

export const getBusinesses = async (req: Request, res: Response) => {
  const { name, description, categoryId, address, locationId, latitude, longitude, range, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, operatingStatusId, socialMediaId, openingHourId, closingHourId, page, limit } = req.query;

  const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (description) {
    whereClause.description = { [Op.iLike]: `%${description}%` };
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

    whereClause.geoPoint = sequelize.literal(`ST_DWithin("Business"."geoPoint", ST_SetSRID(ST_MakePoint(${point.coordinates[0]}, ${point.coordinates[1]}), 4326), ${range})`);
    // console.log('geoPoint: ', sequelize.literal(`ST_MakePoint(${parseFloat(`${latitude}`)}, ${parseFloat(`${longitude}`)})`));
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

  if (operatingStatusId) {
    whereClause.operatingStatusId = operatingStatusId;
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

    for (let i = 0; i < count; i++) {
      const city = cities[Math.floor(Math.random() * 5)];
      const businessId = uuidv4();

      const businessData = {
        id: businessId,
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
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
          countryCode: faker.location.countryCode(),
          areaCode: faker.phone.number().slice(0, 3),
          phoneNumber: faker.phone.number().split('(').join('').split(')').join('').split('-').join('').split(' ').join(''),
          phoneNumberFormatted: faker.phone.number(),
          notes: faker.lorem.sentence(),
        },
        rating: {
          id: uuidv4(),
          ratingValue: faker.number.float({ min: 1, max: 5, precision: 1 }),
          description: faker.lorem.words(3),
        },
        timezone: {
          id: uuidv4(),
          timezoneName: faker.location.timeZone(),
          utcOffset: faker.number.int({ min: -12, max: 12 }).toString(),
          dst: faker.datatype.boolean(),
          dstOffset: faker.number.int({ min: -12, max: 12 }).toString(),
          countryCode: faker.location.countryCode(),
          notes: faker.lorem.sentence(),
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
          description: faker.image.urlPlaceholder(),
        })),
        operatingStatus: {
          id: uuidv4(),
          operatingStatus: opValues[Math.floor(Math.random() * 3)],
        },
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
    const { name, description, categoryId, address, locationId, latitude, longitude, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, operatingStatusId, socialMediaId, openingHourId, closingHourId } = req.body;
    const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };

    const business = await Business.create({
      name,
      description,
      categoryId,
      address,
      locationId,
      geoPoint,
      postalCodeId,
      phoneId,
      email,
      website,
      ratingId,
      reviews,
      timezoneId,
      sourceId,
      operatingStatusId,
      socialMediaId,
      openingHourId,
      closingHourId,
    });

    res.status(201).json(business);
  } catch (error) {
    console.error('Error creating business:', error);
    res.status(500).json({ error: 'Failed to create business' });
  }
};

export const getBusiness = async (req: Request, res: Response) => {
  try {
    const businessId = req.params.id;

    const business = await Business.findByPk(businessId);

    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  } catch (error) {
    console.error('Error retrieving business:', error);
    res.status(500).json({ error: 'Failed to retrieve business' });
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  try {
    const businessId = req.params.id;
    const { name, description, categoryId, address, locationId, latitude, longitude, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, operatingStatusId, socialMediaId, openingHourId, closingHourId } = req.body;
    const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };

    const business = await Business.findByPk(businessId);

    if (business) {
      business.name = name;
      business.description = description;
      business.categoryId = categoryId;
      business.address = address;
      business.locationId = locationId;
      business.geoPoint = geoPoint;
      business.postalCodeId = postalCodeId;
      business.phoneId = phoneId;
      business.email = email;
      business.website = website;
      business.ratingId = ratingId;
      business.reviews = reviews;
      business.timezoneId = timezoneId;
      business.sourceId = sourceId;
      business.operatingStatusId = operatingStatusId;
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
  try {
    const businessId = req.params.id;

    const business = await Business.findByPk(businessId);

    if (business) {
      await business.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'RBusiness not found' });
    }
  } catch (error) {
    console.error('Error deleting business:', error);
    res.status(500).json({ error: 'Failed to delete business' });
  }
};

async function createBulkBusinesses(businessData: any[]) {
  const transaction = await sequelize.transaction();

  try {
    const categories: Partial<BusinessCategoryAttributes>[] = [];
    const locations: Partial<LocationAttributes>[] = [];
    const postalCodes: PostalCodeAttributes[] = [];
    const operatingStatuses: Partial<OperatingStatusAttributes>[] = [];
    const phones: Partial<PhoneAttributes>[] = [];
    const ratings: Partial<RatingAttributes>[] = [];
    const sources: Partial<SourceAttributes>[] = [];
    const timezones: Partial<TimezoneAttributes>[] = [];
    const socialMedias: Partial<SocialMediaAttributes>[] = [];
    const photos: Partial<BusinessPhotoAttributes>[][] = [];
    const openingHours: Partial<OpeningTimeAttributes>[] = [];
    const closingHours: Partial<ClosingTimeAttributes>[] = [];
    const businesses: BusinessAttributes[] = [];
    const geoPoints: Partial<any>[] = [];

    businessData.map(async (data: any) => {
      categories.push(data.category);
      locations.push(data.location);
      geoPoints.push({ type: 'Point', coordinates: [data.longitude, data.latitude], website: data.website });
      postalCodes.push(data.postalCode);
      operatingStatuses.push(data.operatingStatus);
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
        description: data.description,
        categoryId: data.category.id,
        locationId: data.location.id,
        geoPoint: { type: 'Point', coordinates: [data.longitude, data.latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } },
        postalCodeId: data.postalCode.id,
        address: data.address,
        email: data.email,
        website: data.website,
        reviews: data.reviews,
        sourceId: data.source.id,
        phoneId: data.phone.id,
        ratingId: data.rating.id,
        timezoneId: data.timezone.id,
        operatingStatusId: data.operatingStatus.id,
        openingHourId: data.openingHour.id,
        closingHourId: data.closingHour.id,
      });
    });

    await BusinessCategory.bulkCreate(categories, { transaction });
    await Location.bulkCreate(locations, { transaction });
    await PostalCode.bulkCreate(postalCodes, { transaction });
    await BusinessOperatingStatus.bulkCreate(operatingStatuses, { transaction });
    await BusinessPhone.bulkCreate(phones, { transaction });
    await BusinessRating.bulkCreate(ratings, { transaction });
    await BusinessSource.bulkCreate(sources, { transaction });
    await Timezone.bulkCreate(timezones, { transaction });
    await BusinessOpeningHour.bulkCreate(openingHours, { transaction });
    await BusinessClosingHour.bulkCreate(closingHours, { transaction });

    const uk = await Business.bulkCreate(businesses, { transaction });
    await BusinessSocialMedia.bulkCreate(socialMedias, { transaction });
    // await BusinessPhoto.bulkCreate(photos.flat(), { transaction });

    await transaction
      .commit()
      .then(() => {
        return uk;
      })
      .then(() => {
        console.log('geoPoints +++++++++++++++++++++++++++++++++++++++++++: ', geoPoints);
      });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
