import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getMessage } from '../utils/message';
import logger from '../utils/logger';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.error(`User with email ${email} does not exist.`);
      return res.status(getMessage('INVALID_EMAIL').code).json({ error: getMessage('INVALID_EMAIL').message });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.error(`Invalid password provided for user with email ${email}.`);
      return res.status(getMessage('INVALID_PASSWORD').code).json({ error: getMessage('INVALID_PASSWORD').message });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? '');

    logger.info(`User with email ${email} logged in successfully.`);

    // Send the token in the response
    res.sendSuccess({ user, token, message: getMessage('LOGGED_IN').message });
  } catch (error) {
    logger.error('Login failed:', error);
    return res.status(getMessage('LOGIN_FAILED').code).json({ error: getMessage('LOGIN_FAILED').message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.error(`User with email ${email} already exists.`);
      return res.status(getMessage('DUPLICATE_USER').code).json({ error: getMessage('DUPLICATE_USER').message });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    logger.info(`User with email ${email} registered successfully.`);

    res.sendSuccess({ user, message: getMessage('ACCOUNT_CREATED').message });
  } catch (error) {
    logger.error('Failed to create user:', error);
    return res.status(getMessage('FAILED_TO_CREATE_USER').code).json({ error: getMessage('FAILED_TO_CREATE_USER').message });
  }
};
