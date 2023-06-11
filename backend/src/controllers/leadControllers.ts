import { Request, Response } from 'express';
import Lead from '../models/Lead';
import User from '../models/User';

export const getLeads = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const leads = await Lead.findAll({ where: { ownerId: userId as string } });
    res.json(leads);
  } catch (error) {
    console.error('Error while retrieving leads:', error);
    res.status(500).json({ error: 'An error occurred while retrieving leads' });
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    console.error('Error while retrieving lead:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the lead' });
  }
};

export const createLead = async (req: Request, res: Response) => {
  const { userId, ...leadData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const lead = await Lead.create({ ownerId: userId, ...leadData });
    res.status(201).json(lead);
  } catch (error) {
    console.error('Error while creating lead:', error);
    res.status(500).json({ error: 'An error occurred while creating the lead' });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, ...leadData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    await lead.update(leadData);
    res.json(lead);
  } catch (error) {
    console.error('Error while updating lead:', error);
    res.status(500).json({ error: 'An error occurred while updating the lead' });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findOne({ where: { id } });
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    await lead.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error while deleting lead:', error);
    res.status(500).json({ error: 'An error occurred while deleting the lead' });
  }
};
