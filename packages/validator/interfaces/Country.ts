import * as z from 'zod';
import { CountrySchema, CountryFetchRequestSchema, CountryFetchByIdRequestSchema, CountryCreateRequestSchema, CountryUpdateRequestSchema } from '../validators/Country';

type Country = z.infer<typeof CountrySchema>;
type CountryFetchRequestAttributes = z.infer<typeof CountryFetchRequestSchema>;
type CountryFetchByIdRequestAttributes = z.infer<typeof CountryFetchByIdRequestSchema>;
type CountryCreateRequestAttributes = z.infer<typeof CountryCreateRequestSchema>;
type CountryUpdateRequestAttributes = z.infer<typeof CountryUpdateRequestSchema>;

export interface ICountryAttributes extends Country {}
export interface ICountryFetchRequestAttributes extends CountryFetchRequestAttributes {}
export interface ICountryFetchByIdRequestAttributes extends CountryFetchByIdRequestAttributes {}
export interface ICountryCreateRequestAttributes extends CountryCreateRequestAttributes {}
export interface ICountryUpdateRequestAttributes extends CountryUpdateRequestAttributes {}
