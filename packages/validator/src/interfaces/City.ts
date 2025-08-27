import type * as z from 'zod';

import { type CitySchema, type CityFetchRequestSchema, type CityFetchByIdRequestSchema, type CityCreateRequestSchema, type CityUpdateRequestSchema } from '../validators/City';

type City = z.infer<typeof CitySchema>;
type CityFetchRequestAttributes = z.infer<typeof CityFetchRequestSchema>;
type CityFetchByIdRequestAttributes = z.infer<typeof CityFetchByIdRequestSchema>;
type CityCreateRequestAttributes = z.infer<typeof CityCreateRequestSchema>;
type CityUpdateRequestAttributes = z.infer<typeof CityUpdateRequestSchema>;

export interface ICityAttributes extends City {}
export interface ICityFetchRequestAttributes extends CityFetchRequestAttributes {}
export interface ICityFetchByIdRequestAttributes extends CityFetchByIdRequestAttributes {}
export interface ICityCreateRequestAttributes extends CityCreateRequestAttributes {}
export interface ICityUpdateRequestAttributes extends CityUpdateRequestAttributes {}
