import express from 'express';
import { getCities, getCityById, getCitiesByQuery } from '../controllers/CityController/CityController.fetch';
import { createCity } from '../controllers/CityController/CityController.create';
import { updateCity } from '../controllers/CityController/CityController.update';
import { deleteCity } from '../controllers/CityController/CityController.delete';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define city routes
router.get('/search', getCitiesByQuery);
router.get('/', getCities);
router.get('/:id', getCityById);
router.post('/', createCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

export default router;
