import { Request, Response } from 'express';
import RBusiness from '../models/RBusiness';
import Business from '../models/Business';
import { Op } from 'sequelize';
import sequelize from '../config/database';
import { BusinessAttributes } from '../types/business/business';
import { RBusinessAttributes } from '../types/rbusiness';
import { BusinessCategoryAttributes } from '../types/business/businessCategory';
import BusinessCategory from '../models/BusinessCategory';
import { LocationAttributes } from '../types/business/location';
import PostalCode from '../models/PostalCode';
import { OperatingStatusAttributes } from '../types/business/operatingStatus';
import BusinessPhone from '../models/BusinessPhone';
import { faker } from '@faker-js/faker';
import { RatingAttributes } from '../types/business/rating';
import BusinessSocialMedia from '../models/BusinessSocialMedia';
import { SourceAttributes } from '../types/business/source';
import Timezone from '../models/Timezone';
import { OpeningTimeAttributes } from '../types/business/openingHour';
import casual from 'casual';
import { ClosingTimeAttributes } from '../types/business/closingHour';
import Location from '../models/Location';
import BusinessOperatingStatus from '../models/BusinessOperatingStatus';
import BusinessRating from '../models/BusinessRating';
import BusinessSource from '../models/BusinessSource';
import BusinessOpeningHour from '../models/BusinessOpeningHour';
import BusinessClosingHour from '../models/BusinessClosingHour';
import { PostalCodeAttributes } from '../types/business/postalCode';
import { PhoneAttributes } from '../types/business/phone';
import { TimezoneAttributes } from '../types/business/timezone';

export const getBusinesses = async (req: Request, res: Response) => {
  const { name, description, category, city, state, country, postalCode, rating, timezone, operatingStatus, openingHour, closingHour, page, limit } = req.query;

  const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }

  if (description) {
    whereClause.description = { [Op.iLike]: `%${description}%` };
  }

  if (category) {
    whereClause.category = category;
  }

  if (city) {
    whereClause.city = city;
  }

  if (state) {
    whereClause.state = state;
  }

  if (country) {
    whereClause.country = country;
  }

  if (postalCode) {
    whereClause.postalCode = postalCode;
  }

  if (rating) {
    whereClause.rating = rating;
  }

  if (timezone) {
    whereClause.timezone = timezone;
  }

  if (operatingStatus) {
    whereClause.operatingStatus = operatingStatus;
  }

  if (openingHour) {
    whereClause.openingHour = openingHour;
  }

  if (closingHour) {
    whereClause.closingHour = closingHour;
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
    const { count, rows: businesses } = await RBusiness.findAndCountAll({
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
    const businessData: number[] = [];

    for (let i = 0; i < count; i++) {
      businessData.push(i);
    }

    const businesses = createBulkBusinesses(businessData);

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

export const createBusinessesLe = async (req: Request, res: Response) => {
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

    const businesses = createBulkBusinessesle(businessesArray);

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
    const { name, description, category, address, city, state, country, postalCode, phone, email, website, rating, reviews, timezone, photos, source, operatingStatus, socialMedia, openingHour, closingHour } = req.body;

    const business = await RBusiness.create({
      name,
      description,
      category,
      address,
      city,
      state,
      country,
      postalCode,
      phone,
      email,
      website,
      rating,
      reviews,
      timezone,
      photos,
      source,
      operatingStatus,
      socialMedia,
      openingHour,
      closingHour,
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

    const business = await RBusiness.findByPk(businessId);

    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ error: 'RBusiness not found' });
    }
  } catch (error) {
    console.error('Error retrieving business:', error);
    res.status(500).json({ error: 'Failed to retrieve business' });
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  try {
    const businessId = req.params.id;
    const { name, description, category, address, city, state, country, postalCode, phone, email, website, rating, reviews, timezone, photos, source, operatingStatus, socialMedia, openingHour, closingHour } = req.body;

    const business = await RBusiness.findByPk(businessId);

    if (business) {
      business.name = name;
      business.description = description;
      business.category = category;
      business.address = address;
      business.city = city;
      business.state = state;
      business.country = country;
      business.postalCode = postalCode;
      business.phone = phone;
      business.email = email;
      business.website = website;
      business.rating = rating;
      business.reviews = reviews;
      business.timezone = timezone;
      business.photos = photos;
      business.source = source;
      business.operatingStatus = operatingStatus;
      business.socialMedia = socialMedia;
      business.openingHour = openingHour;
      business.closingHour = closingHour;

      await business.save();

      res.json(business);
    } else {
      res.status(404).json({ error: 'RBusiness not found' });
    }
  } catch (error) {
    console.error('Error updating business:', error);
    res.status(500).json({ error: 'Failed to update business' });
  }
};

export const deleteBusiness = async (req: Request, res: Response) => {
  try {
    const businessId = req.params.id;

    const business = await RBusiness.findByPk(businessId);

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

async function createBulkBusinesses(businessData: number[]) {
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
    const openingHours: Partial<OpeningTimeAttributes>[] = [];
    const closingHours: Partial<ClosingTimeAttributes>[] = [];
    const businesses: BusinessAttributes[] = [];

    businessData.map(async (data: number) => {
      const businessCategory: Partial<BusinessCategoryAttributes> = {
        name: values[Math.floor(Math.random() * 21)],
      };
      categories.push(businessCategory);

      const city = cities[Math.floor(Math.random() * 5)];
      const businessLocation: Partial<LocationAttributes> = {
        city: city.name,
        state: city.state,
        country: city.country,
      };
      locations.push(businessLocation);

      const businessPostalCode: PostalCodeAttributes = {
        code: city.postalCode,
      };
      postalCodes.push(businessPostalCode);

      const businessOperatingStatus: Partial<OperatingStatusAttributes> = {
        operatingStatus: opValues[Math.floor(Math.random() * 3)],
      };
      operatingStatuses.push(businessOperatingStatus);

      const businessPhone: Partial<BusinessPhone> = {
        countryCode: faker.location.countryCode(),
        areaCode: faker.phone.number().slice(0, 3),
        phoneNumber: faker.phone.number().split('(').join('').split(')').join('').split('-').join('').split(' ').join(''),
        phoneNumberFormatted: faker.phone.number(),
        notes: faker.lorem.sentence(),
      };
      phones.push(businessPhone);

      const businessRating: Partial<RatingAttributes> = {
        ratingValue: faker.number.float({ min: 1, max: 5, precision: 1 }),
        description: faker.lorem.words(3),
      };
      ratings.push(businessRating);

      const businessSource: Partial<SourceAttributes> = {
        sourceName: sValues[Math.floor(Math.random() * 3)],
      };
      sources.push(businessSource);

      const timezone: Partial<Timezone> = {
        timezoneName: faker.location.timeZone(),
        utcOffset: faker.number.int({ min: -12, max: 12 }).toString(),
        dst: faker.datatype.boolean(),
        dstOffset: faker.number.int({ min: -12, max: 12 }).toString(),
        countryCode: faker.location.countryCode(),
        notes: faker.lorem.sentence(),
      };
      timezones.push(timezone);

      const businessOpeningHour: Partial<OpeningTimeAttributes> = {
        time: casual.time('HH:mm'),
      };
      openingHours.push(businessOpeningHour);

      const businessClosingHour: Partial<ClosingTimeAttributes> = {
        time: casual.time('HH:mm'),
      };
      closingHours.push(businessClosingHour);

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
        operatingStatusId: businessOperatingStatusResponse[index].toJSON().id,
        openingTimeId: businessOpeningHourResponse[index].toJSON().id,
        closingTimeId: businessClosingHourResponse[index].toJSON().id,
      };
      businesses.push(businessData);
      return businesses;
    });

    const uk = await Business.bulkCreate(businesses, { transaction });

    await transaction.commit();
    return uk;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function createBulkBusinessesle(businessData: any[]) {
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
        operatingStatusId: businessOperatingStatusResponse[index].toJSON().id,
        openingTimeId: businessOpeningHourResponse[index].toJSON().id,
        closingTimeId: businessClosingHourResponse[index].toJSON().id,
      };
      businesses.push(businessData);
      return businesses;
    });

    const uk = await Business.bulkCreate(businesses, { transaction });

    await transaction.commit();
    return uk;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
