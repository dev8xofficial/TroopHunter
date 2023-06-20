import { Request, Response } from 'express';
import casual from 'casual';
import { faker } from '@faker-js/faker';
import { Op } from 'sequelize';
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
import { SocialMediaAttributes } from '../types/businessSocialMedia';

export const getBusinesses = async (req: Request, res: Response) => {
  const { name, description, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, operatingStatusId, socialMediaId, openingHourId, closingHourId, page, limit } = req.query;

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
    whereClause.website = website;
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

      const businessData = {
        name: 'Feest Ltd',
        description: 'Balanced context-sensitive adapter',
        category: {
          name: values[Math.floor(Math.random() * 21)],
        },
        location: {
          city: city.name,
          state: city.state,
          country: city.country,
        },
        postalCode: {
          code: city.postalCode,
        },
        address: '2137 Emmanuelle Inlet Apt. 679\nJovanstad, MT 11559',
        email: 'Destin_Heidenreich@hotmail.com',
        website: 'http://www.Jovani.biz/',
        reviews: 717,
        source: {
          sourceName: sValues[Math.floor(Math.random() * 3)],
        },
        phone: {
          countryCode: faker.location.countryCode(),
          areaCode: faker.phone.number().slice(0, 3),
          phoneNumber: faker.phone.number().split('(').join('').split(')').join('').split('-').join('').split(' ').join(''),
          phoneNumberFormatted: faker.phone.number(),
          notes: faker.lorem.sentence(),
        },
        rating: {
          ratingValue: faker.number.float({ min: 1, max: 5, precision: 1 }),
          description: faker.lorem.words(3),
        },
        timezone: {
          timezoneName: faker.location.timeZone(),
          utcOffset: faker.number.int({ min: -12, max: 12 }).toString(),
          dst: faker.datatype.boolean(),
          dstOffset: faker.number.int({ min: -12, max: 12 }).toString(),
          countryCode: faker.location.countryCode(),
          notes: faker.lorem.sentence(),
        },
        socialMedia: {
          facebookProfile: faker.internet.url(),
          twitterProfile: faker.internet.url(),
          instagramProfile: faker.internet.url(),
          linkedInProfile: faker.internet.url(),
          youTubeProfile: faker.internet.url(),
        },
        operatingStatus: {
          operatingStatus: opValues[Math.floor(Math.random() * 3)],
        },
        openingHour: {
          time: casual.time('HH:mm'),
        },
        closingHour: {
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
    const { name, description, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, operatingStatusId, socialMediaId, openingHourId, closingHourId } = req.body;

    const business = await Business.create({
      name,
      description,
      categoryId,
      address,
      locationId,
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
    const { name, description, categoryId, address, locationId, postalCodeId, phoneId, email, website, ratingId, reviews, timezoneId, sourceId, operatingStatusId, socialMediaId, openingHourId, closingHourId } = req.body;

    const business = await Business.findByPk(businessId);

    if (business) {
      business.name = name;
      business.description = description;
      business.categoryId = categoryId;
      business.address = address;
      business.locationId = locationId;
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
    const openingHours: Partial<OpeningTimeAttributes>[] = [];
    const closingHours: Partial<ClosingTimeAttributes>[] = [];
    const businesses: BusinessAttributes[] = [];

    businessData.map(async (data: any) => {
      categories.push(data.category);
      locations.push(data.location);
      postalCodes.push(data.postalCode);
      operatingStatuses.push(data.operatingStatus);
      phones.push(data.phone);
      ratings.push(data.rating);
      sources.push(data.source);
      timezones.push(data.timezone);
      socialMedias.push(data.socialMedia);
      openingHours.push(data.openingHour);
      closingHours.push(data.closingHour);

      return data;
    });

    const businessCategoryResponse = await BusinessCategory.bulkCreate(categories, { transaction });
    const businessLocationResponse = await Location.bulkCreate(locations, { transaction });
    const businessPostalCodeResponse = await PostalCode.bulkCreate(postalCodes, { transaction });
    const businessOperatingStatusResponse = await BusinessOperatingStatus.bulkCreate(operatingStatuses, { transaction });
    const BusinessPhoneResponse = await BusinessPhone.bulkCreate(phones, { transaction });
    const businessRatingResponse = await BusinessRating.bulkCreate(ratings, { transaction });
    const businessSourceResponse = await BusinessSource.bulkCreate(sources, { transaction });
    const timezoneResponse = await Timezone.bulkCreate(timezones, { transaction });
    const socialMediaResponse = await BusinessSocialMedia.bulkCreate(socialMedias, { transaction });
    const businessOpeningHourResponse = await BusinessOpeningHour.bulkCreate(openingHours, { transaction });
    const businessClosingHourResponse = await BusinessClosingHour.bulkCreate(closingHours, { transaction });

    businessData.map(async (data: number, index: number) => {
      const businessData = {
        name: 'Feest Ltd',
        description: 'Balanced context-sensitive adapter',
        categoryId: businessCategoryResponse[index].toJSON().id,
        locationId: businessLocationResponse[index].toJSON().id,
        postalCodeId: businessPostalCodeResponse[index].toJSON().id,
        address: '2137 Emmanuelle Inlet Apt. 679\nJovanstad, MT 11559',
        email: 'Destin_Heidenreich@hotmail.com',
        website: 'http://www.Jovani.biz/',
        reviews: 717,
        sourceId: businessSourceResponse[index].toJSON().id,
        phoneId: BusinessPhoneResponse[index].toJSON().id,
        ratingId: businessRatingResponse[index].toJSON().id,
        timezoneId: timezoneResponse[index].toJSON().id,
        socialMediaId: socialMediaResponse[index].toJSON().id,
        operatingStatusId: businessOperatingStatusResponse[index].toJSON().id,
        openingHourId: businessOpeningHourResponse[index].toJSON().id,
        closingHourId: businessClosingHourResponse[index].toJSON().id,
      };
      businesses.push(businessData);
      return businesses;
    });

    const uk = await Business.bulkCreate(businesses, { transaction });

    await transaction.commit().then(() => {
      return uk;
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
