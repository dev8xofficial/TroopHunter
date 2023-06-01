import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
  res.send('Hello, World!');
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
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

      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (user) {
      await user.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
