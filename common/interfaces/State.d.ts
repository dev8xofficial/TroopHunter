export interface IStateRequestAttributes {
  name: string;
  code: string;
  countryCode: string;
  longitude: number;
  latitude: number;
}

export interface IStateResponseAttributes extends IStateRequestAttributes {
  id: string;
}
