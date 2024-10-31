import { BusinessMessageKey, getBusinessMessage } from '@repo/messages';
import { logger } from '@repo/utils';
import { type IBusinessCreateRequestAttributes, type IBusinessAttributes, type IOpeningHourAttributes, type IClosingHourAttributes, type IDayAttributes, type IBusinessDayAttributes, type IBusinessRatingAttributes, type IBusinessSourceAttributes, type IBusinessOpeningHourAttributes, type IBusinessClosingHourAttributes, type IPostalCodeAttributes, type IBusinessPhoneAttributes, type ITimezoneAttributes, type ApiResponse, type IBusinessCategoryAttributes, createApiResponse } from '@repo/validator';
import { type Request, type Response } from 'express';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '../../config/database';
import { Business, BusinessClosingHour, BusinessDay, BusinessOpeningHour } from '../../models';
import { findOrCreateBusinessPhone, getPhoneWithDetails, findOrCreateBusinessSource, findOrCreateBusinessCategory, findOrCreatePostalCode, findOrCreateBusinessRating, findOrCreateTimezone, findAllOpeningHours, findAllClosingHours, findAllDays } from '../../utils';

export const createBusiness = async (req: Request, res: Response): Promise<Response> => {
  const transaction = await sequelize.transaction();

  const days: IDayAttributes[] | undefined = await findAllDays();
  const openingHours: IOpeningHourAttributes[] | undefined = await findAllOpeningHours();
  const closingHours: IClosingHourAttributes[] | undefined = await findAllClosingHours();
  const daysAndIds: Record<string, { id: string }> = {};
  const openingHoursAndIds: Record<string, { id: string }> = {};
  const closingHoursAndIds: Record<string, { id: string }> = {};

  const businessDays: IBusinessDayAttributes[] = [];
  const businessOpeningHours: IBusinessOpeningHourAttributes[] = [];
  const businessClosingHours: IBusinessClosingHourAttributes[] = [];

  if (days != null && days.length > 0)
    days.forEach((day: IDayAttributes) => {
      daysAndIds[day.day] = { id: day.id };
    });

  if (openingHours != null && openingHours.length > 0)
    openingHours.forEach((openingHour: IOpeningHourAttributes) => {
      openingHoursAndIds[openingHour.time] = { id: openingHour.id };
    });

  if (closingHours != null && closingHours.length > 0)
    closingHours.forEach((closingHour: IClosingHourAttributes) => {
      closingHoursAndIds[closingHour.time] = { id: closingHour.id };
    });

  const { name, businessDomain, category, address, cityId, stateId, countryId, longitude, latitude, postalCode, phone, email, website, rating, reviews, timezone, source, socialMediaId, sponsoredAd, operatingHours } = req.body as IBusinessCreateRequestAttributes;

  const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };
  const payload: Omit<IBusinessAttributes, 'BusinessPhone'> = {
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

    if (category != null) {
      const categoryFromDB: IBusinessCategoryAttributes | undefined = await findOrCreateBusinessCategory(category, transaction);
      payload.categoryId = categoryFromDB?.id;
    }

    if (postalCode != null) {
      const postalCodeFromDB: IPostalCodeAttributes | undefined = await findOrCreatePostalCode(postalCode, transaction);
      payload.postalCodeId = postalCodeFromDB?.id;
    }

    if (phone != null) {
      const phoneWithDetails = getPhoneWithDetails(phone);
      const phoneFromDB: IBusinessPhoneAttributes | undefined = await findOrCreateBusinessPhone(phoneWithDetails, transaction);
      payload.phoneId = phoneFromDB?.id;
    }

    if (rating != null) {
      const ratingFromDB: IBusinessRatingAttributes | undefined = await findOrCreateBusinessRating(rating, transaction);
      payload.ratingId = ratingFromDB?.id;
    }

    if (source != null) {
      const sourceFromDB: IBusinessSourceAttributes | undefined = await findOrCreateBusinessSource(source, transaction);
      payload.sourceId = sourceFromDB?.id;
    }

    if (timezone != null) {
      const timezoneFromDB: ITimezoneAttributes | undefined = await findOrCreateTimezone(timezone, transaction);
      payload.timezoneId = timezoneFromDB?.id;
    }

    const business = await Business.create(payload, { transaction });

    if (operatingHours != null) {
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
    return res.json(response);
  } catch (error) {
    logger.error(`Failed to create ${name}`);
    logger.error('Error creating business:', error);

    // Rollback the transaction if an error occurred
    await transaction.rollback();

    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_CREATE_BUSINESS).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_CREATE_BUSINESS).code });
    return res.json(response);
  }
};

export const createBusinesses = async (req: Request, res: Response): Promise<Response> => {
  const transaction = await sequelize.transaction();

  const businessRequests = req.body as IBusinessCreateRequestAttributes[];

  // Remove duplicate businesses from request data
  const uniqueBusinessKeys = new Set();
  const uniqueBusinessRequests = [];

  const days: IDayAttributes[] | undefined = await findAllDays();
  const openingHours: IOpeningHourAttributes[] | undefined = await findAllOpeningHours();
  const closingHours: IClosingHourAttributes[] | undefined = await findAllClosingHours();
  const daysAndIds: Record<string, { id: string }> = {};
  const openingHoursAndIds: Record<string, { id: string }> = {};
  const closingHoursAndIds: Record<string, { id: string }> = {};

  const businessDays: IBusinessDayAttributes[] = [];
  const businessOpeningHours: IBusinessOpeningHourAttributes[] = [];
  const businessClosingHours: IBusinessClosingHourAttributes[] = [];

  for (const business of businessRequests) {
    const key = `${business.name}-${business.address ?? ''}`; // Businesses without address would fail to create a business.
    if (!uniqueBusinessKeys.has(key)) {
      uniqueBusinessKeys.add(key);
      uniqueBusinessRequests.push(business);
    }
  }

  if (days != null && days.length > 0)
    days.forEach((day: IDayAttributes) => {
      daysAndIds[day.day] = { id: day.id };
    });

  if (openingHours != null && openingHours.length > 0)
    openingHours.forEach((openingHour: IOpeningHourAttributes) => {
      openingHoursAndIds[openingHour.time] = { id: openingHour.id };
    });

  if (closingHours != null && closingHours.length > 0)
    closingHours.forEach((closingHour: IClosingHourAttributes) => {
      closingHoursAndIds[closingHour.time] = { id: closingHour.id };
    });

  try {
    // Filtering pre-existing businesses in the database
    const existingBusinesses = await Business.findAll({
      where: {
        [Op.or]: uniqueBusinessRequests.map((b) => ({
          name: b.name,
          address: b.address,
        })),
      },
    });

    const existingBusinessMap = new Map(existingBusinesses.map((b) => [`${b.name}-${b.address ?? ''}`, b]));

    const newBusinessRequests = uniqueBusinessRequests.filter((b) => !existingBusinessMap.has(`${b.name}-${b.address ?? ''}`));

    const createdBusinesses = await Promise.all(
      newBusinessRequests.map(async (businessData) => {
        const { name, businessDomain, category, address, cityId, stateId, countryId, longitude, latitude, postalCode, phone, email, website, rating, reviews, timezone, source, socialMediaId, sponsoredAd, operatingHours }: IBusinessCreateRequestAttributes = businessData;

        const geoPoint = { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:4326' } } };
        const payload: Omit<IBusinessAttributes, 'BusinessPhone'> = {
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

        if (!(businessDomain != null)) delete payload.businessDomain;
        if (!(address != null)) delete payload.address;
        if (!(geoPoint != null)) delete payload.geoPoint;
        if (!(email != null)) delete payload.email;
        if (!(website != null)) delete payload.website;
        if (!(reviews != null)) delete payload.reviews;
        if (!(socialMediaId != null)) delete payload.socialMediaId;
        if (!(sponsoredAd != null)) delete payload.sponsoredAd;

        if (category != null) {
          const categoryFromDB: IBusinessCategoryAttributes | undefined = await findOrCreateBusinessCategory(category, transaction);
          payload.categoryId = categoryFromDB?.id;
        }

        if (postalCode != null) {
          const postalCodeFromDB: IPostalCodeAttributes | undefined = await findOrCreatePostalCode(postalCode, transaction);
          payload.postalCodeId = postalCodeFromDB?.id;
        }

        if (phone != null) {
          const phoneWithDetails = getPhoneWithDetails(phone);
          const phoneFromDB: IBusinessPhoneAttributes | undefined = await findOrCreateBusinessPhone(phoneWithDetails, transaction);
          payload.phoneId = phoneFromDB?.id;
        }

        if (rating != null) {
          const ratingFromDB: IBusinessRatingAttributes | undefined = await findOrCreateBusinessRating(rating, transaction);
          payload.ratingId = ratingFromDB?.id;
        }

        if (source != null) {
          const sourceFromDB: IBusinessSourceAttributes | undefined = await findOrCreateBusinessSource(source, transaction);
          payload.sourceId = sourceFromDB?.id;
        }

        if (timezone != null) {
          const timezoneFromDB: ITimezoneAttributes | undefined = await findOrCreateTimezone(timezone, transaction);
          payload.timezoneId = timezoneFromDB?.id;
        }

        const business = await Business.create(payload, { transaction });

        if (operatingHours != null) {
          for (const { day, openingHour, closingHour } of operatingHours) {
            businessDays.push({ id: uuidv4(), businessId: business.id, dayId: daysAndIds[day].id });
            businessOpeningHours.push({ id: uuidv4(), businessId: business.id, openingHourId: openingHoursAndIds[openingHour].id });
            businessClosingHours.push({ id: uuidv4(), businessId: business.id, closingHourId: closingHoursAndIds[closingHour].id });
          }
        }

        return business;
      }),
    );

    await transaction.commit();

    await BusinessDay.bulkCreate(businessDays);
    await BusinessOpeningHour.bulkCreate(businessOpeningHours);
    await BusinessClosingHour.bulkCreate(businessClosingHours);
    logger.info('Businesses created successfully.');

    const response: ApiResponse<{ businesses: Business[] }> = createApiResponse({ success: true, data: { businesses: createdBusinesses }, message: getBusinessMessage(BusinessMessageKey.BUSINESSES_CREATED).message, status: getBusinessMessage(BusinessMessageKey.BUSINESSES_CREATED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Error creating businesses:', error);

    // Rollback the transaction if an error occurred
    await transaction.rollback();

    const response: ApiResponse<null> = createApiResponse({ error: getBusinessMessage(BusinessMessageKey.FAILED_TO_CREATE_BUSINESSES).message, status: getBusinessMessage(BusinessMessageKey.FAILED_TO_CREATE_BUSINESSES).code });
    return res.json(response);
  }
};
