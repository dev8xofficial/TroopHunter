import express from 'express';
import { getCities, getCityById, getCitiesByQuery, createCity, updateCity, deleteCity } from '../controllers/CityController';
import { authenticateUser } from '../middlewares/authMiddleware';
import { CityCreateRequestValidationMiddleware, CityFetchByIdRequestValidationMiddleware, CityFetchRequestValidationMiddleware, CityUpdateRequestValidationMiddleware } from 'validator/validators';
import { PaginationRequestValidationMiddleware } from 'validator/validators';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define city routes
router.get('/search', CityFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getCitiesByQuery);
router.get('/', PaginationRequestValidationMiddleware, getCities);
router.get('/:id', CityFetchByIdRequestValidationMiddleware, getCityById);
router.post('/', CityCreateRequestValidationMiddleware, createCity);
router.put('/:id', CityFetchByIdRequestValidationMiddleware, CityUpdateRequestValidationMiddleware, updateCity);
router.delete('/:id', CityFetchByIdRequestValidationMiddleware, deleteCity);

export default router;
