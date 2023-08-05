import express from 'express';
import { getCountries, getCountryById, getCountriesByQuery } from '../controllers/CountryController/CountryController.fetch';
import { createCountry } from '../controllers/CountryController/CountryController.create';
import { updateCountry } from '../controllers/CountryController/CountryController.update';
import { deleteCountry } from '../controllers/CountryController/CountryController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define country routes
router.get('/search', getCountriesByQuery);
router.get('/', getCountries);
router.get('/:id', getCountryById);
router.post('/', createCountry);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);

export default router;
