import { Request, Response } from 'express';
import Lists from '../models/List';
import User from '../models/User';
import logger from '../utils/logger';

export const getLists = async (req: Request, res: Response) => {
  try {
    const lists = await Lists.findAll();
    logger.info('Lists retrieved successfully.');
    res.json(lists);
  } catch (error) {
    logger.error('Error while retrieving lists:', error);
    res.status(500).json({ error: 'An error occurred while retrieving lists' });
  }
};

export const getListById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const list = await Lists.findOne({ where: { id } });
    if (!list) {
      logger.warn(`List with ID ${id} not found.`);
      return res.status(404).json({ error: 'List not found' });
    }
    logger.info(`List with ID ${id} retrieved successfully.`);
    res.json(list);
  } catch (error) {
    logger.error(`Error while retrieving list with ID ${id}:`, error);
    res.status(500).json({ error: 'An error occurred while retrieving the list' });
  }
};

export const createList = async (req: Request, res: Response) => {
  const { userId, ...listData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found.`);
      return res.status(404).json({ error: 'User not found' });
    }
    const list = await Lists.create({ ownerId: userId, ...listData });
    logger.info('List created successfully.');
    res.status(201).json(list);
  } catch (error) {
    logger.error('Error while creating list:', error);
    res.status(500).json({ error: 'An error occurred while creating the list' });
  }
};

export const updateList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, ...listData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} not found.`);
      return res.status(404).json({ error: 'User not found' });
    }
    const list = await Lists.findOne({ where: { id } });
    if (!list) {
      logger.warn(`List with ID ${id} not found.`);
      return res.status(404).json({ error: 'List not found' });
    }
    await list.update(listData);
    logger.info(`List with ID ${id} updated successfully.`);
    res.json(list);
  } catch (error) {
    logger.error(`Error while updating list with ID ${id}:`, error);
    res.status(500).json({ error: 'An error occurred while updating the list' });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const list = await Lists.findOne({ where: { id } });
    if (!list) {
      logger.warn(`List with ID ${id} not found.`);
      return res.status(404).json({ error: 'List not found' });
    }
    await list.destroy();
    logger.info(`List with ID ${id} deleted successfully.`);
    res.status(204).json();
  } catch (error) {
    logger.error(`Error while deleting list with ID ${id}:`, error);
    res.status(500).json({ error: 'An error occurred while deleting the list' });
  }
};
