export interface ITimezoneRequestAttributes {
  timezoneName: string;
  utcOffset: string;
  dst: boolean;
  dstOffset: string;
  countryCode: string;
}

export interface ITimezoneResponseAttributes extends ITimezoneRequestAttributes {
  id: string;
}
