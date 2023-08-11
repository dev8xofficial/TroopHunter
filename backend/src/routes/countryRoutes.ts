import express from 'express';
import { getCountries, getCountryById, getCountriesByQuery, createCountry, updateCountry, deleteCountry } from '../controllers/CountryController';
import { CountryFetchByIdRequestValidationMiddleware, CountryFetchRequestValidationMiddleware, CountryCreateRequestValidationMiddleware, CountryUpdateRequestValidationMiddleware } from 'validator/validators/Country';
import { authenticateUser } from '../middlewares/authMiddleware';
import { PaginationRequestValidationMiddleware } from 'validator/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define country routes
router.get('/search', CountryFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getCountriesByQuery);
router.get('/', PaginationRequestValidationMiddleware, getCountries);
router.get('/:id', CountryFetchByIdRequestValidationMiddleware, getCountryById);
router.post('/', CountryCreateRequestValidationMiddleware, createCountry);
router.put('/:id', CountryFetchByIdRequestValidationMiddleware, CountryUpdateRequestValidationMiddleware, updateCountry);
router.delete('/:id', CountryFetchByIdRequestValidationMiddleware, deleteCountry);

export default router;
