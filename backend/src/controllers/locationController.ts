// locationController.ts
import { Op } from 'sequelize'; // Import the Op operator for complex queries
import { Request, Response } from 'express';
import Location from '../models/Location';
import logger from '../utils/logger';

// Get a location by city, state, and country
export const getLocationsByQuery = async (req: Request, res: Response) => {
  const { city, state, country } = req.query;

  try {
    if (!city || !state || !country) {
      return res.status(400).json({ error: 'Please provide city, state, and country parameters.' });
    }

    const locations = await Location.findAll({
      where: {
        city: city as string,
        state: state as string,
        country: country as string,
      },
    });

    if (locations.length === 0) {
      logger.warn(`No locations found for city: ${city}, state: ${state}, country: ${country}`);
      return res.status(404).json({ error: 'No locations found.' });
    }

    logger.info(`Successfully retrieved locations for city: ${city}, state: ${state}, country: ${country}`);
    res.json(locations);
  } catch (error) {
    logger.error('Error while retrieving locations:', error);
    res.status(500).json({ error: 'An error occurred while retrieving locations' });
  }
};

// Get all locations
export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.findAll();
    logger.info('Successfully retrieved locations');
    res.json(locations);
  } catch (error) {
    logger.error('Error while retrieving locations:', error);
    res.status(500).json({ error: 'An error occurred while retrieving locations' });
  }
};

// Get a location by ID
export const getLocationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const location = await Location.findOne({ where: { id } });
    if (!location) {
      logger.warn(`Location with ID ${id} not found`);
      return res.status(404).json({ error: 'Location not found' });
    }
    logger.info(`Successfully retrieved location with ID ${id}`);
    res.json(location);
  } catch (error) {
    logger.error(`Error while retrieving location with ID ${id}:`, error);
    res.status(500).json({ error: 'An error occurred while retrieving the location' });
  }
};

// Create a new location
export const createLocation = async (req: Request, res: Response) => {
  const { city, state, country } = req.body;
  try {
    const location = await Location.create({ city, state, country });
    logger.info(`Location created successfully with ID ${location.id}`);
    res.status(201).json(location);
  } catch (error) {
    logger.error('Error while creating location:', error);
    res.status(500).json({ error: 'An error occurred while creating the location' });
  }
};

// Update a location by ID
export const updateLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { city, state, country } = req.body;
  try {
    const location = await Location.findOne({ where: { id } });
    if (!location) {
      logger.warn(`Location with ID ${id} not found`);
      return res.status(404).json({ error: 'Location not found' });
    }
    await location.update({ city, state, country });
    logger.info(`Location with ID ${id} updated successfully`);
    res.json(location);
  } catch (error) {
    logger.error(`Error while updating location with ID ${id}:`, error);
    res.status(500).json({ error: 'An error occurred while updating the location' });
  }
};

// Delete a location by ID
export const deleteLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const location = await Location.findOne({ where: { id } });
    if (!location) {
      logger.warn(`Location with ID ${id} not found`);
      return res.status(404).json({ error: 'Location not found' });
    }
    await location.destroy();
    logger.info(`Location with ID ${id} deleted successfully`);
    res.status(204).json();
  } catch (error) {
    logger.error(`Error while deleting location with ID ${id}:`, error);
    res.status(500).json({ error: 'An error occurred while deleting the location' });
  }
};
