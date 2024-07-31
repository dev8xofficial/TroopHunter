import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Sequelize from '../../config/database';
import { IBusinessCreateRequestAttributes, IBusinessAttributes, IOpeningHourAttributes, IClosingHourAttributes, IDayAttributes, IBusinessDayAttributes } from 'validator/interfaces';
import { IBusinessRatingAttributes } from 'validator/interfaces';
import { IBusinessSourceAttributes } from 'validator/interfaces';
import { IBusinessOpeningHourAttributes } from 'validator/interfaces';
import { IBusinessClosingHourAttributes } from 'validator/interfaces';
import { IPostalCodeAttributes } from 'validator/interfaces';
import { IBusinessPhoneAttributes } from 'validator/interfaces';
import { ITimezoneAttributes } from 'validator/interfaces';
import { ApiResponse } from 'validator/interfaces';
import { IBusinessCategoryAttributes } from 'validator/interfaces';
import Business from '../../models/Business';
import { findOrCreateBusinessPhone, getPhoneWithDetails } from '../../utils/phone';
import { findOrCreateBusinessSource } from '../../utils/business';
import { findOrCreateBusinessCategory } from '../../utils/category';
import { findOrCreatePostalCode } from '../../utils/postalCode';
import { findOrCreateBusinessRating } from '../../utils/rating';
import { findOrCreateTimezone } from '../../utils/timezone';
import { findAllOpeningHours } from '../../utils/openingHour';
import { findAllClosingHours } from '../../utils/closingHour';
import { createApiResponse } from 'validator/utils';
import { BusinessMessageKey, getBusinessMessage } from '../../messages/Business';
import logger from '../../utils/logger';
import BusinessOpeningHour from '../../models/BusinessOpeningHour';
import BusinessClosingHour from '../../models/BusinessClosingHour';
import BusinessDay from '../../models/BusinessDay';
import { findAllDays } from '../../utils/day';

export const createBusiness = async (req: Request, res: Response) => {
  const transaction = await Sequelize.transaction();

  const days: IDayAttributes[] | undefined = await findAllDays();
  const openingHours: IOpeningHourAttributes[] | undefined = await findAllOpeningHours();
  const closingHours: IClosingHourAttributes[] | undefined = await findAllClosingHours();
  let daysAndIds: any = {}
  let openingHoursAndIds: any = {}
  let closingHoursAndIds: any = {}

  let businessDays: IBusinessDayAttributes[] = [];
  let businessOpeningHours: IBusinessOpeningHourAttributes[] = [];
  let businessClosingHours: IBusinessClosingHourAttributes[] = [];

  if(days?.length)
    days.map((day: IDayAttributes) => { daysAndIds[day.day] = { id: day.id }});

  if(openingHours?.length)
    openingHours.map((openingHour: IOpeningHourAttributes) => { openingHoursAndIds[openingHour.time] = { id: openingHour.id }});

  if(closingHours?.length)
    closingHours.map((closingHour: IClosingHourAttributes) => { closingHoursAndIds[closingHour.time] = { id: closingHour.id }});

  const { name, businessDomain, category, address, cityId, stateId, countryId, longitude, latitude, postalCode, phone, email, website, rating, reviews, timezone, source, socialMediaId, sponsoredAd, operatingHours }: IBusinessCreateRequestAttributes = req.body;

  const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };
  let payload: Omit<IBusinessAttributes, 'BusinessPhone'> = {
    id: uuidv4(),
    name,
    businessDomain: businessDomain?.toLocaleLowerCase(),
    address,
    cityId,
    stateId,
    countryId,
    geoPoint,
    longitude,
    latitude,
    email,
    website,
    reviews,
    socialMediaId,
    sponsoredAd,
  };

  try {
    logger.debug('Creating a new business:', payload);

    if (category) {
      const categoryFromDB: IBusinessCategoryAttributes | undefined = await findOrCreateBusinessCategory(category, transaction);
      payload.categoryId = categoryFromDB?.id;
    }

    if (postalCode) {
      const postalCodeFromDB: IPostalCodeAttributes | undefined = await findOrCreatePostalCode(postalCode, transaction);
      payload.postalCodeId = postalCodeFromDB?.id;
    }

    if (phone) {
      const phoneWithDetails = getPhoneWithDetails(phone);
      const phoneFromDB: IBusinessPhoneAttributes | undefined = await findOrCreateBusinessPhone(phoneWithDetails, transaction);
      payload.phoneId = phoneFromDB?.id;
    }

    if (rating !== undefined && rating !== null) {
      const ratingFromDB: IBusinessRatingAttributes | undefined = await findOrCreateBusinessRating(rating, transaction);
      payload.ratingId = ratingFromDB?.id;
    }

    if (source) {
      const sourceFromDB: IBusinessSourceAttributes | undefined = await findOrCreateBusinessSource(source, transaction);
      payload.sourceId = sourceFromDB?.id;
    }

    if (timezone) {
      const timezoneFromDB: ITimezoneAttributes | undefined = await findOrCreateTimezone(timezone, transaction);
      payload.timezoneId = timezoneFromDB?.id;
    }

    const business = await Business.create(payload, { transaction });

    if(operatingHours) {
      for (const { day, openingHour, closingHour } of operatingHours) {
        businessDays.push({ id: uuidv4(), businessId: business.id, dayId: daysAndIds[day].id });
        businessOpeningHours.push({ id: uuidv4(), businessId: business.id, openingHourId: openingHoursAndIds[openingHour].id });
        businessClosingHours.push({ id: uuidv4(), businessId: business.id, closingHourId: closingHoursAndIds[closingHour].id });
      }
    }

    await transaction.commit();

    await BusinessDay.bulkCreate(businessDays);
    await BusinessOpeningHour.bulkCreate(businessOpeningHours);
    await BusinessClosingHour.bulkCreate(businessClosingHours);
    logger.info(`Business named ${name} created successfully.`);

    const response: ApiResponse<{ business: Business }> = createApiResponse({ success: true, data: { business }, message: getBusinessMessage(BusinessMessageKey.BUSINESS_CREATED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESS_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error(`Failed to create ${name}`);
    logger.error('Error creating business:', error);

    // Rollback the transaction if an error occurred
    await transaction.rollback();

    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_CREATE_BUSINESS).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_CREATE_BUSINESS).code });
    res.json(response);
  }
};

export const createBusinesses = async (req: Request, res: Response) => {
  const transaction = await Sequelize.transaction();

  const businessRequests: IBusinessCreateRequestAttributes[] = req.body;

  // Remove duplicate businesses from request data
  const uniqueBusinessKeys = new Set();
  const uniqueBusinessRequests = [];

  const days: IDayAttributes[] | undefined = await findAllDays();
  const openingHours: IOpeningHourAttributes[] | undefined = await findAllOpeningHours();
  const closingHours: IClosingHourAttributes[] | undefined = await findAllClosingHours();
  let daysAndIds: any = {}
  let openingHoursAndIds: any = {}
  let closingHoursAndIds: any = {}

  let businessDays: IBusinessDayAttributes[] = [];
  let businessOpeningHours: IBusinessOpeningHourAttributes[] = [];
  let businessClosingHours: IBusinessClosingHourAttributes[] = [];

  for (const business of businessRequests) {
    const key = `${business.name}-${business.address}`;
    if (!uniqueBusinessKeys.has(key)) {
      uniqueBusinessKeys.add(key);
      uniqueBusinessRequests.push(business);
    }
  }

  if(days?.length)
    days.map((day: IDayAttributes) => { daysAndIds[day.day] = { id: day.id }});

  if(openingHours?.length)
    openingHours.map((openingHour: IOpeningHourAttributes) => { openingHoursAndIds[openingHour.time] = { id: openingHour.id }});

  if(closingHours?.length)
    closingHours.map((closingHour: IClosingHourAttributes) => { closingHoursAndIds[closingHour.time] = { id: closingHour.id }});

  try {
    // Filtering pre-existing businesses in the database
    const existingBusinesses = await Business.findAll({
      where: {
        [Op.or]: uniqueBusinessRequests.map(b => ({
          name: b.name,
          address: b.address,
        })),
      },
    });

    const existingBusinessMap = new Map(
      existingBusinesses.map(b => [`${b.name}-${b.address}`, b])
    );

    const newBusinessRequests = uniqueBusinessRequests.filter(b => 
      !existingBusinessMap.has(`${b.name}-${b.address}`)
    );

    const createdBusinesses = await Promise.all(
      newBusinessRequests.map(async (businessData) => {
        const { name, businessDomain, category, address, cityId, stateId, countryId, longitude, latitude, postalCode, phone, email, website, rating, reviews, timezone, source, socialMediaId, sponsoredAd, operatingHours }: IBusinessCreateRequestAttributes = businessData;

        const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };
        let payload: Omit<IBusinessAttributes, 'BusinessPhone'> = {
          id: uuidv4(),
          name,
          businessDomain: businessDomain?.toLocaleLowerCase(),
          address,
          cityId,
          stateId,
          countryId,
          geoPoint,
          longitude,
          latitude,
          email,
          website,
          reviews,
          socialMediaId,
          sponsoredAd,
        };

        if (!businessDomain) delete payload.businessDomain;
        if (!address) delete payload.address;
        if (!geoPoint) delete payload.geoPoint;
        if (!email) delete payload.email;
        if (!website) delete payload.website;
        if (!reviews) delete payload.reviews;
        if (!socialMediaId) delete payload.socialMediaId;
        if (!sponsoredAd) delete payload.sponsoredAd;

        if (category) {
          const categoryFromDB: IBusinessCategoryAttributes | undefined = await findOrCreateBusinessCategory(category, transaction);
          payload.categoryId = categoryFromDB?.id;
        }
    
        if (postalCode) {
          const postalCodeFromDB: IPostalCodeAttributes | undefined = await findOrCreatePostalCode(postalCode, transaction);
          payload.postalCodeId = postalCodeFromDB?.id;
        }
    
        if (phone) {
          const phoneWithDetails = getPhoneWithDetails(phone);
          const phoneFromDB: IBusinessPhoneAttributes | undefined = await findOrCreateBusinessPhone(phoneWithDetails, transaction);
          payload.phoneId = phoneFromDB?.id;
        }
    
        if (rating !== undefined && rating !== null) {
          const ratingFromDB: IBusinessRatingAttributes | undefined = await findOrCreateBusinessRating(rating, transaction);
          payload.ratingId = ratingFromDB?.id;
        }
    
        if (source) {
          const sourceFromDB: IBusinessSourceAttributes | undefined = await findOrCreateBusinessSource(source, transaction);
          payload.sourceId = sourceFromDB?.id;
        }
    
        if (timezone) {
          const timezoneFromDB: ITimezoneAttributes | undefined = await findOrCreateTimezone(timezone, transaction);
          payload.timezoneId = timezoneFromDB?.id;
        }
    
        const business = await Business.create(payload, { transaction });

        if(operatingHours) {
          for (const { day, openingHour, closingHour } of operatingHours) {
            businessDays.push({ id: uuidv4(), businessId: business.id, dayId: daysAndIds[day].id });
            businessOpeningHours.push({ id: uuidv4(), businessId: business.id, openingHourId: openingHoursAndIds[openingHour].id });
            businessClosingHours.push({ id: uuidv4(), businessId: business.id, closingHourId: closingHoursAndIds[closingHour].id });
          }
        }

        return business;
      })
    );

    await transaction.commit();

    await BusinessDay.bulkCreate(businessDays);
    await BusinessOpeningHour.bulkCreate(businessOpeningHours);
    await BusinessClosingHour.bulkCreate(businessClosingHours);
    logger.info('Businesses created successfully.');

    const response: ApiResponse<{ businesses: Business[] }> = createApiResponse({ success: true, data: { businesses: createdBusinesses }, message: getBusinessMessage(BusinessMessageKey.BUSINESSES_CREATED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESSES_CREATED).code });
    res.json(response);
  } catch (error) {
    logger.error('Error creating businesses:', error);

    // Rollback the transaction if an error occurred
    await transaction.rollback();

    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_CREATE_BUSINESSES).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_CREATE_BUSINESSES).code });
    res.json(response);
  }
};