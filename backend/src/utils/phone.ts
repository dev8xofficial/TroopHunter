import libphonenumber from 'google-libphonenumber';
import { PhoneAttributes } from '../types/businessPhone';
import BusinessPhone from '../models/BusinessPhone';
import { Transaction } from 'sequelize';

export const getPhoneWithDetails = (phone: string): PhoneAttributes => {
  const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
  const parsedNumber = phoneUtil.parse(phone);
  const countryCode = parsedNumber.getCountryCode() ? `${parsedNumber.getCountryCode()?.toString()}` : '';
  const regionCode = phoneUtil.getRegionCodeForNumber(parsedNumber) ? `${phoneUtil.getRegionCodeForNumber(parsedNumber)}` : '';
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

  console.log('Country Code: ', countryCode);
  console.log('Region Code: ', regionCode);
  console.log('Number: ', number);
  console.log('Number National: ', numberNationalFormatted);
  console.log('Number International: ', numberInternationalFormatted);
  console.log('Number Type: ', numberType);
  console.log('Is Number Valid: ', isValid);

  return { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid };
};

export const findOrCreateBusinessPhone = async (phone: PhoneAttributes, transaction: Transaction): Promise<PhoneAttributes | undefined> => {
  try {
    const { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid } = phone;
    const [record, created] = await BusinessPhone.findOrCreate({
      where: { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid },
      transaction,
    });

    if (created) {
      return record.toJSON() as PhoneAttributes;
    } else {
      return record.toJSON() as PhoneAttributes;
    }
  } catch (error) {
    console.error('Failed to find or create business phone:', error);
  }
};
