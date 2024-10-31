import { verifyToken } from '@repo/middlewares';
import { CountryFetchByIdRequestValidationMiddleware, CountryFetchRequestValidationMiddleware, CountryCreateRequestValidationMiddleware, CountryUpdateRequestValidationMiddleware, PaginationRequestValidationMiddleware } from '@repo/validator';
import express from 'express';

import { getCountries, getCountryById, getCountriesByQuery, createCountry, updateCountry, deleteCountry } from '../controllers/CountryController';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(verifyToken);

// Define country routes
router.get('/search', CountryFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getCountriesByQuery);
router.get('/', PaginationRequestValidationMiddleware, getCountries);
router.get('/:id', CountryFetchByIdRequestValidationMiddleware, getCountryById);
router.post('/', CountryCreateRequestValidationMiddleware, createCountry);
router.put('/:id', CountryFetchByIdRequestValidationMiddleware, CountryUpdateRequestValidationMiddleware, updateCountry);
router.delete('/:id', CountryFetchByIdRequestValidationMiddleware, deleteCountry);

export default router;
