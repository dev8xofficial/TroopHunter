import { UserMessageKey, getUserMessage, AuthMessageKey, getAuthMessage } from '@repo/messages';
import { getLeadsByUserId, getUserByEmail } from '@repo/services';
import { logger } from '@repo/utils';
import { type ApiResponse, type IUserTokenRequestAttributes, type IUserAttributes, createApiResponse, type IUserFetchByIdRequestAttributes, type IRefreshTokenAttributes, type ILeadAttributes } from '@repo/validator';
import bcrypt from 'bcryptjs';
import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { UserToken } from '../../models';

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body as IUserAttributes;

    // Check if the user exists
    // const user: User | null = await User.findOne({ where: { email }, include: [{ model: Lead }] });
    const userResponse: ApiResponse<IUserAttributes | null> = await getUserByEmail({ email });
    if (userResponse.data == null) {
      logger.error(`User with email ${email} does not exist.`);
      const response: ApiResponse<null> = createApiResponse({ error: userResponse.message, status: userResponse.status });
      return res.json(response);
    }

    const user = userResponse.data;
    if (!user.verified) {
      logger.error(`${email} not verified yet.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.EMAIL_UNVERIFIED).message, status: getUserMessage(UserMessageKey.EMAIL_UNVERIFIED).code });
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
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET ?? '', { expiresIn: '60m' });

    const leads: ApiResponse<ILeadAttributes[] | null> = await getLeadsByUserId({ userId: user.id });
    user.Leads = leads.data ?? [];

    let userToken: UserToken | null = await UserToken.findOne({ where: { userId: user.id } });
    if (userToken == null) {
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

    const response: ApiResponse<{ user: IUserAttributes | null; accessToken: string; refreshToken: string }> = createApiResponse({ success: true, data: { user, accessToken, refreshToken }, message: getUserMessage(UserMessageKey.LOGGED_IN).message, status: getUserMessage(UserMessageKey.LOGGED_IN).code });
    return res.json(response);
  } catch (error) {
    logger.error('Login failed:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.LOGIN_FAILED).message, status: getUserMessage(UserMessageKey.LOGIN_FAILED).code });
    return res.json(response);
  }
};

export const signOut = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params as IUserFetchByIdRequestAttributes;
    console.log('ID:::::::::::::::::::::::::::: ', id);

    // Check if the user exists
    const userToken: UserToken | null = await UserToken.findOne({ where: { userId: id } });
    if (userToken == null) {
      logger.error(`User with id ${id} does not exist.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).code });
      return res.json(response);
    }

    // const userToken: UserToken | null = await UserToken.findOne({ where: { userId: id } });
    if (userToken != null) {
      userToken.accessToken = null;
      userToken.refreshToken = null;
      await userToken.save();
    }

    logger.info(`User with id ${id} sign out successfully.`);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.SIGN_OUT).message, status: getUserMessage(UserMessageKey.SIGN_OUT).code });
    return res.json(response);
  } catch (error) {
    logger.error('Sign out failed:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.SIGN_OUT_FAILED).message, status: getUserMessage(UserMessageKey.SIGN_OUT_FAILED).code });
    return res.json(response);
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  const { refreshToken } = req.body as IRefreshTokenAttributes;
  const userToken: UserToken | null = await UserToken.findOne({ where: { refreshToken } });

  if (refreshToken == null) {
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
    const accessToken = jwt.sign({ userId: decoded }, process.env.JWT_SECRET ?? '', { expiresIn: '30m' });

    const userTokenNew: UserToken | null = await UserToken.findOne({ where: { refreshToken } });

    if (userTokenNew != null) {
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

// export const verifyUserToken = async (req: Request, res: Response): Promise<Response> => {
//   const { token } = req.params as IVerifyUserAttributes;

//   try {
//     const userToken: UserToken | null = await UserToken.findOne({ where: { accessToken: token } });

//     if (token == null) {
//       logger.error(getAuthMessage(AuthMessageKey.MISSING_ACCESS_TOKEN).message);
//       const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.MISSING_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.MISSING_ACCESS_TOKEN).code });
//       return res.json(response);
//     }

//     if (userToken === null) {
//       logger.error(getAuthMessage(AuthMessageKey.NOT_FOUND_ACCESS_TOKEN).message);
//       const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.NOT_FOUND_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.NOT_FOUND_ACCESS_TOKEN).code });
//       return res.json(response);
//     }

//     jwt.verify(token, process.env.JWT_SECRET ?? '');

//     const response: ApiResponse<null> = createApiResponse({ success: true, data: null, message: getAuthMessage(AuthMessageKey.ACCESS_TOKEN_RETRIEVED).message, status: getAuthMessage(AuthMessageKey.ACCESS_TOKEN_RETRIEVED).code });
//     return res.json(response);
//   } catch (error) {
//     logger.error('Access denied: Invalid access token:', error);
//     const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.INVALID_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.INVALID_ACCESS_TOKEN).code });
//     return res.json(response);
//   }
// };

export const verifyUserToken = async (req: Request, res: Response): Promise<Response> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token == null) {
    logger.error(getAuthMessage(AuthMessageKey.MISSING_ACCESS_TOKEN).message);
    const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.MISSING_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.MISSING_ACCESS_TOKEN).code });
    return res.json(response);
  }

  const userToken: UserToken | null = await UserToken.findOne({ where: { accessToken: token } });
  if (userToken === null) {
    logger.error(getAuthMessage(AuthMessageKey.NOT_FOUND_ACCESS_TOKEN).message);
    const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.NOT_FOUND_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.NOT_FOUND_ACCESS_TOKEN).code });
    return res.json(response);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET ?? '');
    const response: ApiResponse<null> = createApiResponse({ success: true, data: null, message: getAuthMessage(AuthMessageKey.ACCESS_TOKEN_RETRIEVED).message, status: getAuthMessage(AuthMessageKey.ACCESS_TOKEN_RETRIEVED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Access denied: Invalid access token:', error);
    const response: ApiResponse<null> = createApiResponse({ error: getAuthMessage(AuthMessageKey.INVALID_ACCESS_TOKEN).message, status: getAuthMessage(AuthMessageKey.INVALID_ACCESS_TOKEN).code });
    return res.json(response);
  }
};
