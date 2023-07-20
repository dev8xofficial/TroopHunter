import { Request, Response } from 'express';
import User from '../models/User';
import logger from '../utils/logger';
import { isValidJSON } from '../utils/helper';

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Log a success message
    logger.info('Getting users.');

    // Your code logic here

    res.send('Hello, World!');
  } catch (error) {
    // Log an error message
    logger.error('Failed to get users:', error);

    res.status(500).json({ error: 'Failed to get users' });
  }
};

export const getUserWithInclude = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const include = req.query.include as string; // Cast 'include' to a string

    if (!include || !isValidJSON(include)) {
      return res.status(400).json({ error: 'Invalid include parameter. Please provide valid JSON.' });
    }

    const user = await User.findOne({ where: { id }, include: JSON.parse(include) });

    if (user) {
      // Log a success message
      logger.info(`Retrieved user with ID ${id} and included data.`);

      res.json(user);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${id} not found.`);

      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    // Log an error message
    logger.error('Failed to retrieve user:', error);

    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (user) {
      // Log a success message
      logger.info(`Retrieved user with ID ${id}.`);

      res.json(user);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${id} not found.`);

      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    // Log an error message
    logger.error('Failed to retrieve user:', error);

    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email } = req.body;

    const user = await User.findByPk(userId);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      await user.save();

      // Log a success message
      logger.info(`Updated user with ID ${userId}.`);

      res.json(user);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${userId} not found.`);

      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    // Log an error message
    logger.error('Failed to update user:', error);

    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (user) {
      await user.destroy();

      // Log a success message
      logger.info(`Deleted user with ID ${userId}.`);

      res.status(204).end();
    } else {
      // Log a warning message
      logger.warn(`User with ID ${userId} not found.`);

      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    // Log an error message
    logger.error('Failed to delete user:', error);

    res.status(500).json({ error: 'Failed to delete user' });
  }
};
