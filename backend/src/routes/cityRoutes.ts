import express from 'express';
import { getCities, getCityById, createCity, updateCity, deleteCity, getCitiesByQuery } from '../controllers/cityController';
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
