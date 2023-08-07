import express from 'express';
import { getCountries, getCountryById, getCountriesByQuery } from '../controllers/CountryController/CountryController.fetch';
import { createCountry } from '../controllers/CountryController/CountryController.create';
import { updateCountry } from '../controllers/CountryController/CountryController.update';
import { deleteCountry } from '../controllers/CountryController/CountryController.delete';
import { countryFetchByIdRequestValidationMiddleware, countryFetchRequestValidationMiddleware, countryCreateRequestValidationMiddleware, countryUpdateRequestValidationMiddleware } from '../models/Country/Country.validator';
import { authenticateUser } from '../middlewares/authMiddleware';
import { paginationRequestValidationMiddleware } from '../validators/Pagination.validator';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define country routes
router.get('/search', countryFetchRequestValidationMiddleware, paginationRequestValidationMiddleware, getCountriesByQuery);
router.get('/', paginationRequestValidationMiddleware, getCountries);
router.get('/:id', countryFetchByIdRequestValidationMiddleware, getCountryById);
router.post('/', countryCreateRequestValidationMiddleware, createCountry);
router.put('/:id', countryFetchByIdRequestValidationMiddleware, countryUpdateRequestValidationMiddleware, updateCountry);
router.delete('/:id', countryFetchByIdRequestValidationMiddleware, deleteCountry);

export default router;
