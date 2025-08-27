import type * as z from 'zod';

import { type QueueSchema, type QueueFetchRequestSchema, type QueueFetchByIdRequestSchema, type QueueCreateRequestSchema, type QueueUpdateRequestSchema } from '../validators/Queue';

type QueueAttributes = z.infer<typeof QueueSchema>;
type QueueFetchRequestSchemaAttributes = z.infer<typeof QueueFetchRequestSchema>;
type QueueFetchByIdRequestSchemaAttributes = z.infer<typeof QueueFetchByIdRequestSchema>;
type QueueCreateRequestSchemaAttributes = z.infer<typeof QueueCreateRequestSchema>;
type QueueUpdateRequestSchemaAttributes = z.infer<typeof QueueUpdateRequestSchema>;

export interface IQueueAttributes extends QueueAttributes {}
export interface IQueueFetchRequestSchemaAttributes extends QueueFetchRequestSchemaAttributes {}
export interface IQueueFetchByIdRequestSchemaAttributes extends QueueFetchByIdRequestSchemaAttributes {}
export interface IQueueCreateRequestSchemaAttributes extends QueueCreateRequestSchemaAttributes {}
export interface IQueueUpdateRequestSchemaAttributes extends QueueUpdateRequestSchemaAttributes {}
