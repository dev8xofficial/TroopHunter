import express, { Request, Response } from 'express';
import BusinessPhone from '../models/BusinessPhone';

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

    res.status(201).json({ phone });
  } catch (error) {
    console.error('Error creating phone number:', error);
    res.status(500).json({ error: 'Failed to create phone number' });
  }
});

// Get all phone numbers
router.get('/phones', async (_req: Request, res: Response) => {
  try {
    const phones = await BusinessPhone.findAll();

    res.status(200).json({ phones });
  } catch (error) {
    console.error('Error fetching phone numbers:', error);
    res.status(500).json({ error: 'Failed to fetch phone numbers' });
  }
});

// Get a single phone number by ID
router.get('/phone/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const phone = await BusinessPhone.findByPk(id);

    if (!phone) {
      return res.status(404).json({ error: 'Phone number not found' });
    }

    res.status(200).json({ phone });
  } catch (error) {
    console.error('Error fetching phone number:', error);
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

    res.status(200).json({ phone });
  } catch (error) {
    console.error('Error updating phone number:', error);
    res.status(500).json({ error: 'Failed to update phone number' });
  }
});

// Delete a phone number
router.delete('/phone/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const phone = await BusinessPhone.findByPk(id);

    if (!phone) {
      return res.status(404).json({ error: 'Phone number not found' });
    }

    await phone.destroy();

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting phone number:', error);
    res.status(500).json({ error: 'Failed to delete phone number' });
  }
});

export default router;
