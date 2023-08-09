import express from 'express';
import { getCities, getCityById, getCitiesByQuery } from '../controllers/CityController/CityController.fetch';
import { createCity } from '../controllers/CityController/CityController.create';
import { updateCity } from '../controllers/CityController/CityController.update';
import { deleteCity } from '../controllers/CityController/CityController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';
import { cityCreateRequestValidationMiddleware, cityFetchByIdRequestValidationMiddleware, cityFetchRequestValidationMiddleware, cityUpdateRequestValidationMiddleware } from 'common/validators/City';
import { paginationRequestValidationMiddleware } from 'common/validators/Pagination';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define city routes
router.get('/search', cityFetchRequestValidationMiddleware, paginationRequestValidationMiddleware, getCitiesByQuery);
router.get('/', paginationRequestValidationMiddleware, getCities);
router.get('/:id', cityFetchByIdRequestValidationMiddleware, getCityById);
router.post('/', cityCreateRequestValidationMiddleware, createCity);
router.put('/:id', cityFetchByIdRequestValidationMiddleware, cityUpdateRequestValidationMiddleware, updateCity);
router.delete('/:id', cityFetchByIdRequestValidationMiddleware, deleteCity);

export default router;
