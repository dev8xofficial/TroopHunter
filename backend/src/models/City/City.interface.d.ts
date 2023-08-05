export interface ICityRequestAttributes {
  name: string;
  stateCode: string;
  countryCode: string;
  longitude: number;
  latitude: number;
}

export interface ICityResponseAttributes extends ICityRequestAttributes {
  id: string;
}
