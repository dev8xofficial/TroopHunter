import { Request, Response } from 'express';
import LeadBusiness from '../models/LeadBusiness';
import logger from '../utils/logger';
import Business from '../models/Business';

export const createLeadBusinesses = async (req: Request, res: Response) => {
  try {
    const leadBusinessData = req.body; // Array of objects, each containing leadId and businessId
    const leadBusinesses = await LeadBusiness.bulkCreate(leadBusinessData);
    res.status(201).json(leadBusinesses);
    logger.info('LeadBusinesses created successfully.');
  } catch (error) {
    console.error('Error while bulk creating LeadBusinesses:', error);
    logger.error('Error while bulk creating LeadBusinesses:', error);
    res.status(500).json({ error: 'An error occurred while bulk creating LeadBusinesses' });
  }
};

export const createLeadBusiness = async (req: Request, res: Response) => {
  try {
    const { leadId, businessId } = req.body;
    const leadBusiness = await LeadBusiness.create({ leadId, businessId });
    res.status(201).json(leadBusiness);
    logger.info('LeadBusiness created successfully.');
  } catch (error) {
    console.error('Error while creating LeadBusiness:', error);
    logger.error('Error while creating LeadBusiness:', error);
    res.status(500).json({ error: 'An error occurred while creating the LeadBusiness' });
  }
};

export const getBusinessesByLeadId = async (req: Request, res: Response) => {
  try {
    const { leadId, page, limit } = req.params;

    // Find all businesses associated with the given leadId and include the Business model
    const leadBusinesses = await LeadBusiness.findAll({ where: { leadId } });

    if (leadBusinesses.length === 0) {
      return res.status(404).json({ error: 'No businesses found for the given leadId' });
    }

    const businessIds = leadBusinesses.map((leadBusiness) => leadBusiness.businessId);

    const paginationOptions: { [key: string]: number } = {};
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (!isNaN(pageNumber) && pageNumber > 0) {
      paginationOptions.offset = (pageNumber - 1) * limitNumber;
    }

    if (!isNaN(limitNumber) && limitNumber > 0) {
      paginationOptions.limit = limitNumber;
    }

    try {
      const { count, rows: businesses } = await Business.findAndCountAll({ where: { id: businessIds } });

      const totalPages = Math.ceil(count / limitNumber);

      res.json({
        totalRecords: count,
        totalPages,
        businesses,
      });
    } catch (error) {
      logger.error('Error retrieving lead associated businesses:', error);
      res.status(500).json({ error: 'An error occurred while retrieving lead associated businesses.' });
    }
  } catch (error) {
    console.error('Error while retrieving businesses by leadId:', error);
    res.status(500).json({ error: 'An error occurred while retrieving businesses by leadId' });
  }
};

export const getLeadBusinesses = async (req: Request, res: Response) => {
  try {
    const leadBusinesses = await LeadBusiness.findAll();
    res.json(leadBusinesses);
    logger.info('Retrieved all LeadBusinesses.');
  } catch (error) {
    console.error('Error while retrieving LeadBusinesses:', error);
    logger.error('Error while retrieving LeadBusinesses:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the LeadBusinesses' });
  }
};

export const getLeadBusiness = async (req: Request, res: Response) => {
  try {
    const { leadId, businessId } = req.params;
    const leadBusiness = await LeadBusiness.findOne({ where: { leadId, businessId } });

    if (leadBusiness) {
      res.json(leadBusiness);
      logger.info(`Retrieved LeadBusiness with leadId ${leadId} and businessId ${businessId}.`);
    } else {
      res.status(404).json({ error: 'LeadBusiness not found' });
      logger.warn(`LeadBusiness with leadId ${leadId} and businessId ${businessId} not found.`);
    }
  } catch (error) {
    console.error('Error while retrieving LeadBusiness:', error);
    logger.error('Error while retrieving LeadBusiness:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the LeadBusiness' });
  }
};

export const updateLeadBusiness = async (req: Request, res: Response) => {
  try {
    const { leadId, businessId } = req.params;
    const { newLeadId, newBusinessId } = req.body;
    const leadBusiness = await LeadBusiness.findOne({ where: { leadId, businessId } });

    if (leadBusiness) {
      await leadBusiness.update({ leadId: newLeadId, businessId: newBusinessId });
      res.json(leadBusiness);
      logger.info(`Updated LeadBusiness with leadId ${leadId} and businessId ${businessId}.`);
    } else {
      res.status(404).json({ error: 'LeadBusiness not found' });
      logger.warn(`LeadBusiness with leadId ${leadId} and businessId ${businessId} not found.`);
    }
  } catch (error) {
    console.error('Error while updating LeadBusiness:', error);
    logger.error('Error while updating LeadBusiness:', error);
    res.status(500).json({ error: 'An error occurred while updating the LeadBusiness' });
  }
};

export const deleteLeadBusiness = async (req: Request, res: Response) => {
  try {
    const { leadId, businessId } = req.params;
    const leadBusiness = await LeadBusiness.findOne({ where: { leadId, businessId } });

    if (leadBusiness) {
      await leadBusiness.destroy();
      res.json({ message: 'LeadBusiness deleted successfully' });
      logger.info(`Deleted LeadBusiness with leadId ${leadId} and businessId ${businessId}.`);
    } else {
      res.status(404).json({ error: 'LeadBusiness not found' });
      logger.warn(`LeadBusiness with leadId ${leadId} and businessId ${businessId} not found.`);
    }
  } catch (error) {
    console.error('Error while deleting LeadBusiness:', error);
    logger.error('Error while deleting LeadBusiness:', error);
    res.status(500).json({ error: 'An error occurred while deleting the LeadBusiness' });
  }
};
