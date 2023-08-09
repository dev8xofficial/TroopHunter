export interface ICityRequestAttributes {
  name: string;
  state: string;
  stateCode: string;
  country: string;
  countryCode: string;
  longitude: number;
  latitude: number;
}

export interface ICityResponseAttributes extends ICityRequestAttributes {
  id: string;
}
