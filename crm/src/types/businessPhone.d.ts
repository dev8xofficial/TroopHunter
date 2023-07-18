export interface BusinessPhoneAttributes {
  id?: string;
  countryCode: string;
  regionCode: string;
  number: string;
  numberNationalFormatted: string;
  numberInternationalFormatted: string;
  numberType: string;
  isValid: boolean;
}
