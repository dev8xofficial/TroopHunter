import Joi from 'joi';

export interface GeoPointAttributes {
  type: string;
  coordinates: number[];
}

// Define the Joi schema for GeoPointAttributes
export const geoPointSchema = Joi.object<GeoPointAttributes>({
  type: Joi.string().required(),
  coordinates: Joi.array().items(Joi.number()).required(),
});
