import type * as z from 'zod';

import { type CityQueueSchema, type CityQueueFetchRequestSchema, type CityQueueFetchByIdRequestSchema, type CityQueueCreateRequestSchema, type CityQueueUpdateRequestSchema } from '../validators/CityQueue';

type CityQueueAttributes = z.infer<typeof CityQueueSchema>;
type CityQueueFetchRequestSchemaAttributes = z.infer<typeof CityQueueFetchRequestSchema>;
type CityQueueFetchByIdRequestSchemaAttributes = z.infer<typeof CityQueueFetchByIdRequestSchema>;
type CityQueueCreateRequestSchemaAttributes = z.infer<typeof CityQueueCreateRequestSchema>;
type CityQueueUpdateRequestSchemaAttributes = z.infer<typeof CityQueueUpdateRequestSchema>;

export interface ICityQueueAttributes extends CityQueueAttributes {}
export interface ICityQueueFetchRequestSchemaAttributes extends CityQueueFetchRequestSchemaAttributes {}
export interface ICityQueueFetchByIdRequestSchemaAttributes extends CityQueueFetchByIdRequestSchemaAttributes {}
export interface ICityQueueCreateRequestSchemaAttributes extends CityQueueCreateRequestSchemaAttributes {}
export interface ICityQueueUpdateRequestSchemaAttributes extends CityQueueUpdateRequestSchemaAttributes {}
