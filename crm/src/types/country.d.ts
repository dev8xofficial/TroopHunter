export interface ICountryCreationRequestAttributes {
  name: string;
  code: string;
  phoneCode: string;
  currency: string;
  longitude: number;
  latitude: number;
}

export interface ICountryCreationResponseAttributes extends ICountryCreationRequestAttributes {
  id: string;
}
