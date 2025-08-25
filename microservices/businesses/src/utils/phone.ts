import { type IBusinessPhoneAttributes } from '@repo/validator';
import libphonenumber from 'google-libphonenumber';
import { type Transaction } from 'sequelize';

import { logger } from './logger';
import { BusinessPhone } from '../models';

export const getPhoneWithDetails = (phone: string): Omit<IBusinessPhoneAttributes, 'id'> => {
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  const parsedNumber = phoneUtil.parse(phone);
  const countryCode = parsedNumber.getCountryCode() != null ? String(parsedNumber.getCountryCode()) : '';
  const regionCode = phoneUtil.getRegionCodeForNumber(parsedNumber) != null ? String(phoneUtil.getRegionCodeForNumber(parsedNumber)) : '';
  const number = phoneUtil.format(parsedNumber, libphonenumber.PhoneNumberFormat.E164);
  const numberNationalFormatted = phoneUtil.format(parsedNumber, libphonenumber.PhoneNumberFormat.NATIONAL);
  const numberInternationalFormatted = phoneUtil.format(parsedNumber, libphonenumber.PhoneNumberFormat.INTERNATIONAL);

  // Mapping object for phone number types
  const phoneNumberTypeMap = {
    [libphonenumber.PhoneNumberType.FIXED_LINE]: 'FIXED_LINE',
    [libphonenumber.PhoneNumberType.MOBILE]: 'MOBILE',
    [libphonenumber.PhoneNumberType.FIXED_LINE_OR_MOBILE]: 'FIXED_LINE_OR_MOBILE',
    [libphonenumber.PhoneNumberType.TOLL_FREE]: 'TOLL_FREE',
    [libphonenumber.PhoneNumberType.PREMIUM_RATE]: 'PREMIUM_RATE',
    [libphonenumber.PhoneNumberType.SHARED_COST]: 'SHARED_COST',
    [libphonenumber.PhoneNumberType.VOIP]: 'VOIP',
    [libphonenumber.PhoneNumberType.PERSONAL_NUMBER]: 'PERSONAL_NUMBER',
    [libphonenumber.PhoneNumberType.PAGER]: 'PAGER',
    [libphonenumber.PhoneNumberType.UAN]: 'UAN',
    [libphonenumber.PhoneNumberType.VOICEMAIL]: 'VOICEMAIL',
    [libphonenumber.PhoneNumberType.UNKNOWN]: 'UNKNOWN',
  };

  const numberType = phoneNumberTypeMap[phoneUtil.getNumberType(parsedNumber)];

  const isValid = phoneUtil.isValidNumber(parsedNumber);

  // logger.info('Phone details:');
  // logger.info('Country Code:', countryCode);
  // logger.info('Region Code:', regionCode);
  // logger.info('Number:', number);
  // logger.info('Number National:', numberNationalFormatted);
  // logger.info('Number International:', numberInternationalFormatted);
  // logger.info('Number Type:', numberType);
  // logger.info('Is Number Valid:', isValid);

  return { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid };
};

export const findOrCreateBusinessPhone = async (phone: Omit<IBusinessPhoneAttributes, 'id'>, transaction: Transaction): Promise<IBusinessPhoneAttributes | undefined> => {
  try {
    const { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid } = phone;
    const [record, created] = await BusinessPhone.findOrCreate({
      where: { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid },
      transaction,
    });

    if (created) {
      logger.info('Business phone created successfully.');
      return record.toJSON();
    } else {
      logger.info('Business phone already exists.');
      return record.toJSON();
    }
  } catch (error) {
    logger.error('Failed to find or create business phone:', error);
  }
};
