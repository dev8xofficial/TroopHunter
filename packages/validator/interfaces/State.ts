import * as z from 'zod';
import { StateSchema, StateFetchRequestSchema, StateFetchByIdRequestSchema, StateCreateRequestSchema, StateUpdateRequestSchema } from '../validators/State';

type State = z.infer<typeof StateSchema>;
type StateFetchRequestAttributes = z.infer<typeof StateFetchRequestSchema>;
type StateFetchByIdRequestAttributes = z.infer<typeof StateFetchByIdRequestSchema>;
type StateCreateRequestAttributes = z.infer<typeof StateCreateRequestSchema>;
type StateUpdateRequestAttributes = z.infer<typeof StateUpdateRequestSchema>;

export interface IStateAttributes extends State {}
export interface IStateFetchRequestAttributes extends StateFetchRequestAttributes {}
export interface IStateFetchByIdRequestAttributes extends StateFetchByIdRequestAttributes {}
export interface IStateCreateRequestAttributes extends StateCreateRequestAttributes {}
export interface IStateUpdateRequestAttributes extends StateUpdateRequestAttributes {}
