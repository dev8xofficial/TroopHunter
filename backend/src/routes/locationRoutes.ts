import express from 'express';
import { getLocationsByQuery, getLocations, getLocationById, createLocation, updateLocation, deleteLocation } from '../controllers/locationController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

// Apply the authMiddleware to secure the routes
router.use(authenticateUser);

// Define location routes
router.get('/search', getLocationsByQuery); // New endpoint for location search
router.get('/', getLocations);
router.get('/:id', getLocationById);
router.post('/', createLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export default router;
