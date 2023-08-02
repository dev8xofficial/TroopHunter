export interface ICityCreationRequestAttributes {
  name: string;
  stateCode: string;
  countryCode: string;
  longitude: number;
  latitude: number;
}

export interface ICityCreationResponseAttributes extends ICityCreationRequestAttributes {
  id: string;
}
