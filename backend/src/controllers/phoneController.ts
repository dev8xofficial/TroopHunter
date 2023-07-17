import express, { Request, Response } from 'express';
import BusinessPhone from '../models/BusinessPhone';
import logger from '../utils/logger';

const router = express.Router();

// Create a phone number
router.post('/phone', async (req: Request, res: Response) => {
  try {
    const { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid } = req.body;

    const phone = await BusinessPhone.create({
      countryCode,
      regionCode,
      number,
      numberNationalFormatted,
      numberInternationalFormatted,
      numberType,
      isValid,
    });

    logger.info('Phone number created successfully:', phone);

    res.status(201).json({ phone });
  } catch (error) {
    logger.error('Failed to create phone number:', error);
    res.status(500).json({ error: 'Failed to create phone number' });
  }
});

// Get all phone numbers
router.get('/phones', async (_req: Request, res: Response) => {
  try {
    const phones = await BusinessPhone.findAll();

    logger.info('Fetched all phone numbers:', phones);

    res.status(200).json({ phones });
  } catch (error) {
    logger.error('Failed to fetch phone numbers:', error);
    res.status(500).json({ error: 'Failed to fetch phone numbers' });
  }
});

// Get a single phone number by ID
router.get('/phone/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const phone = await BusinessPhone.findByPk(id);

    if (!phone) {
      logger.warn(`Phone number with ID ${id} not found.`);
      return res.status(404).json({ error: 'Phone number not found' });
    }

    logger.info(`Fetched phone number with ID ${id}:`, phone);

    res.status(200).json({ phone });
  } catch (error) {
    logger.error('Failed to fetch phone number:', error);
    res.status(500).json({ error: 'Failed to fetch phone number' });
  }
});

// Update a phone number
router.put('/phone/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { countryCode, regionCode, number, numberNationalFormatted, numberInternationalFormatted, numberType, isValid, notes } = req.body;

    const phone = await BusinessPhone.findByPk(id);

    if (!phone) {
      logger.warn(`Phone number with ID ${id} not found.`);
      return res.status(404).json({ error: 'Phone number not found' });
    }

    await phone.update({
      countryCode,
      regionCode,
      number,
      numberNationalFormatted,
      numberInternationalFormatted,
      numberType,
      isValid,
    });

    logger.info(`Phone number with ID ${id} updated successfully.`, phone);

    res.status(200).json({ phone });
  } catch (error) {
    logger.error('Failed to update phone number:', error);
    res.status(500).json({ error: 'Failed to update phone number' });
  }
});

// Delete a phone number
router.delete('/phone/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const phone = await BusinessPhone.findByPk(id);

    if (!phone) {
      logger.warn(`Phone number with ID ${id} not found.`);
      return res.status(404).json({ error: 'Phone number not found' });
    }

    await phone.destroy();

    logger.info(`Phone number with ID ${id} deleted successfully.`);

    res.status(204).end();
  } catch (error) {
    logger.error('Failed to delete phone number:', error);
    res.status(500).json({ error: 'Failed to delete phone number' });
  }
});

export default router;
