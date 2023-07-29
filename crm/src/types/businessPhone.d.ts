export interface IBusinessPhoneCreationRequestAttributes {
  countryCode: string;
  regionCode: string;
  number: string;
  numberNationalFormatted: string;
  numberInternationalFormatted: string;
  numberType: string;
  isValid: boolean;
}

export interface IBusinessPhoneCreationResponseAttributes extends IBusinessPhoneCreationRequestAttributes {
  id: string;
}
