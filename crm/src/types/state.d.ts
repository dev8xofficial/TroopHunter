export interface IStateCreationRequestAttributes {
  name: string;
  code: string;
  countryCode: string;
  longitude: number;
  latitude: number;
}

export interface IStateCreationResponseAttributes extends IStateCreationRequestAttributes {
  id: string;
}
