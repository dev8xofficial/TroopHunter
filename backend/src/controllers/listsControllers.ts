import { Request, Response } from 'express';
import Lists from '../models/List';
import User from '../models/User';

export const getLists = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const lists = await Lists.findAll({ where: { ownerId: userId as string } });
    res.json(lists);
  } catch (error) {
    console.error('Error while retrieving lists:', error);
    res.status(500).json({ error: 'An error occurred while retrieving lists' });
  }
};

export const getListById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const list = await Lists.findOne({ where: { id } });
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    res.json(list);
  } catch (error) {
    console.error('Error while retrieving list:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the list' });
  }
};

export const createList = async (req: Request, res: Response) => {
  const { userId, ...listData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const list = await Lists.create({ ownerId: userId, ...listData });
    res.status(201).json(list);
  } catch (error) {
    console.error('Error while creating list:', error);
    res.status(500).json({ error: 'An error occurred while creating the list' });
  }
};

export const updateList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, ...listData } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const list = await Lists.findOne({ where: { id } });
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    await list.update(listData);
    res.json(list);
  } catch (error) {
    console.error('Error while updating list:', error);
    res.status(500).json({ error: 'An error occurred while updating the list' });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const list = await Lists.findOne({ where: { id } });
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    await list.destroy();
    res.status(204).json();
  } catch (error) {
    console.error('Error while deleting list:', error);
    res.status(500).json({ error: 'An error occurred while deleting the list' });
  }
};
