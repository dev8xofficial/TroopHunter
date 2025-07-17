import { verifyToken } from '@repo/middlewares';
import { CityCreateRequestValidationMiddleware, CityFetchByIdRequestValidationMiddleware, CityFetchRequestValidationMiddleware, CityUpdateRequestValidationMiddleware, PaginationRequestValidationMiddleware } from '@repo/validator';
import express from 'express';

import { getCities, getCityById, getCitiesByQuery, createCity, updateCity, deleteCity } from '../controllers/CityController';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(verifyToken);

// Define city routes
router.get('/search', CityFetchRequestValidationMiddleware, PaginationRequestValidationMiddleware, getCitiesByQuery);
router.get('/', PaginationRequestValidationMiddleware, getCities);
router.get('/:id', CityFetchByIdRequestValidationMiddleware, getCityById);
router.post('/', CityCreateRequestValidationMiddleware, createCity);
router.put('/:id', CityFetchByIdRequestValidationMiddleware, CityUpdateRequestValidationMiddleware, updateCity);
router.delete('/:id', CityFetchByIdRequestValidationMiddleware, deleteCity);

export default router;
