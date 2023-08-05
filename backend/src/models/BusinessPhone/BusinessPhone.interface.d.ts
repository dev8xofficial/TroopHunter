export interface IBusinessPhoneRequestAttributes {
  countryCode: string;
  regionCode: string;
  number: string;
  numberNationalFormatted: string;
  numberInternationalFormatted: string;
  numberType: string;
  isValid: boolean;
}

export interface IBusinessPhoneResponseAttributes extends IBusinessPhoneRequestAttributes {
  id: string;
}
