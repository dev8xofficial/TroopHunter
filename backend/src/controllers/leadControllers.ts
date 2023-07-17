import { Request, Response } from 'express';
import Lead from '../models/Lead';
import User from '../models/User';
import logger from '../utils/logger';

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.findAll();
    logger.info('Successfully retrieved leads');
    res.json(leads);
  } catch (error) {
    logger.error('Error while retrieving leads:', error);
    res.status(500).json({ error: 'An error occurred while retrieving leads' });
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      return res.status(404).json({ error: 'Lead not found' });
    }
    logger.info(`Successfully retrieved lead with ID ${id}`);
    res.json(lead);
  } catch (error) {
    logger.error(`Error while retrieving lead with ID ${id}:`, error);
    res.status(500).json({ error: 'An error occurred while retrieving the lead' });
  }
};

export const createLead = async (req: Request, res: Response) => {
  const { userId, ...leadData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      return res.status(404).json({ error: 'User not found' });
    }
    const lead = await Lead.create({ ownerId: userId, ...leadData });
    logger.info(`Lead created successfully with ID ${lead.id}`);
    res.status(201).json(lead);
  } catch (error) {
    logger.error('Error while creating lead:', error);
    res.status(500).json({ error: 'An error occurred while creating the lead' });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, ...leadData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found`);
      return res.status(404).json({ error: 'User not found' });
    }
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      return res.status(404).json({ error: 'Lead not found' });
    }
    await lead.update(leadData);
    logger.info(`Lead with ID ${id} updated successfully`);
    res.json(lead);
  } catch (error) {
    logger.error(`Error while updating lead with ID ${id}:`, error);
    res.status(500).json({ error: 'An error occurred while updating the lead' });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      logger.warn(`Lead with ID ${id} not found`);
      return res.status(404).json({ error: 'Lead not found' });
    }
    await lead.destroy();
    logger.info(`Lead with ID ${id} deleted successfully`);
    res.status(204).json();
  } catch (error) {
    logger.error(`Error while deleting lead with ID ${id}:`, error);
    res.status(500).json({ error: 'An error occurred while deleting the lead' });
  }
};
