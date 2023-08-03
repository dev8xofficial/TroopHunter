import Joi from 'joi';

export interface GeoPointAttributes {
  type: string;
  coordinates: number[];
}
