import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../../utils/logger';
import { ApiResponse, IUserFetchByIdRequestAttributes, IUserTokenRequestAttributes } from 'validator/interfaces';
import { IUserAttributes } from 'validator/interfaces';
import { createApiResponse } from 'validator/utils';
import Lead from '../../models/Lead';
import { UserMessageKey, getUserMessage } from '../../messages/User';
import { AuthMessageKey, getAuthMessage } from '../../messages/Auth';
import UserToken from '../../models/UserToken';
import { v4 as uuidv4 } from 'uuid';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserAttributes = req.body;

    // Check if the user exists
    const user: User | null = await User.findOne({ where: { email }, include: [{ model: Lead }] });
    if (!user) {
      logger.error(`User with email ${email} does not exist.`);
      const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.INVALID_AUTH_EMAIL).message, status: getAuthMessage(AuthMessageKey.INVALID_AUTH_EMAIL).code });
      return res.json(response);
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.error(`Invalid password provided for user with email ${email}.`);
      const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.INVALID_AUTH_PASSWORD).message, status: getAuthMessage(AuthMessageKey.INVALID_AUTH_PASSWORD).code });
      return res.json(response);
    }

    // Generate a JWT token
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '30m' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '40m' });

    let userToken: UserToken | null = await UserToken.findOne({ where: { userId: user.id } });

    if (!userToken) {
      const payload: IUserTokenRequestAttributes = {
        id: uuidv4(),
        userId: user.id,
        accessToken,
        refreshToken,
      };
      userToken = await UserToken.create(payload);
    } else {
      userToken.accessToken = accessToken;
      userToken.refreshToken = refreshToken;
      await userToken.save();
    }

    logger.info(`User with email ${email} logged in successfully.`);

    const response: ApiResponse<{ user: User | null; accessToken: string; refreshToken: string }> = createApiResponse({ success: true, data: { user, accessToken, refreshToken }, message: getUserMessage(UserMessageKey.LOGGED_IN).message, status: getUserMessage(UserMessageKey.LOGGED_IN).code });
    res.json(response);
  } catch (error) {
    logger.error('Login failed:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.LOGIN_FAILED).message, status: getUserMessage(UserMessageKey.LOGIN_FAILED).code });
    return res.json(response);
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log('ID:::::::::::::::::::::::::::: ', id);

    // Check if the user exists
    const userToken: UserToken | null = await UserToken.findOne({ where: { userId: id } });
    if (!userToken) {
      logger.error(`User with id ${id} does not exist.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).code });
      return res.json(response);
    }

    // const userToken: UserToken | null = await UserToken.findOne({ where: { userId: id } });
    if (userToken !== null && userToken !== undefined) {
      userToken.accessToken = null;
      userToken.refreshToken = null;
      userToken.save();
    }

    logger.info(`User with id ${id} sign out successfully.`);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.SIGN_OUT).message, status: getUserMessage(UserMessageKey.SIGN_OUT).code });
    res.json(response);
  } catch (error) {
    logger.error('Sign out failed:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.SIGN_OUT_FAILED).message, status: getUserMessage(UserMessageKey.SIGN_OUT_FAILED).code });
    return res.json(response);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const userToken: UserToken | null = await UserToken.findOne({ where: { refreshToken } });

  if (!refreshToken) {
    logger.error(getAuthMessage(AuthMessageKey.MISSING_REFRESH_TOKEN).message);
    const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.MISSING_REFRESH_TOKEN).message, status: getAuthMessage(AuthMessageKey.MISSING_REFRESH_TOKEN).code });
    return res.json(response);
  }

  if (userToken === null) {
    logger.error(getAuthMessage(AuthMessageKey.NOT_FOUND_REFRESH_TOKEN).message);
    const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.NOT_FOUND_REFRESH_TOKEN).message, status: getAuthMessage(AuthMessageKey.NOT_FOUND_REFRESH_TOKEN).code });
    return res.json(response);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET ?? '');

    // Generate a new access token and send it in the response
    const accessToken = jwt.sign({ userId: decoded }, process.env.JWT_SECRET ?? '', { expiresIn: '15m' });

    let userTokenNew: UserToken | null = await UserToken.findOne({ where: { refreshToken } });

    if (userTokenNew) {
      userTokenNew.accessToken = accessToken;
      userTokenNew.refreshToken = refreshToken;
      await userTokenNew.save();
    }

    const response: ApiResponse<{ accessToken: string }> = createApiResponse({ success: true, data: { accessToken }, message: getAuthMessage(AuthMessageKey.ACCESS_TOKEN_REFRESHED).message, status: getAuthMessage(AuthMessageKey.ACCESS_TOKEN_REFRESHED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Access denied: Invalid refresh token:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.INVALID_REFRESH_TOKEN).message, status: getAuthMessage(AuthMessageKey.INVALID_REFRESH_TOKEN).code });
    return res.json(response);
  }
};
