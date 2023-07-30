import express from 'express';
import { getCountries, getCountryById, createCountry, updateCountry, deleteCountry, getCountriesByQuery } from '../controllers/countryController';
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
