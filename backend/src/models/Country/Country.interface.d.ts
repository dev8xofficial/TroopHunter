export interface ICountryRequestAttributes {
  name: string;
  code: string;
  phoneCode: string;
  currency: string;
  longitude: number;
  latitude: number;
}

export interface ICountryResponseAttributes extends ICountryRequestAttributes {
  id: string;
}
