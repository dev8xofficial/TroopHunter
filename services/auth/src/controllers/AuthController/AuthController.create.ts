import { Request, Response } from 'express';
import User from '../../models/User';
import logger from '../../utils/logger';
import { ApiResponse, ISendVerificationTokenAttributes, IUserAttributes } from 'validator/interfaces';
import { createApiResponse } from 'validator/utils';
import { UserMessageKey, getUserMessage } from '../../messages/User';
import { checkToken, generateToken } from '../../utils/jwt';
import sendEmail from '../../utils/emailVerification';
import { verifyEmail } from '../../templates/verifyEmail';

export const sendVerificationToken = async (req: Request, res: Response) => {
  try {
    const { email }: ISendVerificationTokenAttributes = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND).code });
      return res.json(response);
    }

    const payload = {
      id: existingUser.id,
      email,
    };
    const token = await generateToken(payload, {
      expiresIn: '0.5h',
      algorithm: 'HS256',
    });

    const html = verifyEmail(`${process.env.BASE_URL}/auth/verify/${existingUser.id}/${token}`);
    const emailResponse = sendEmail(email, 'Verify Your Email', html);

    logger.info(`Verify email: ${email}`);
    logger.info(`Email response: ${emailResponse}`);

    const response: ApiResponse<User> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.VERIFY_EMAIL).message, status: getUserMessage(UserMessageKey.VERIFY_EMAIL).code });
    res.json(response);
  } catch (error) {
    logger.error('Failed to verify user:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_CREATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_CREATE_USER).code });
    return res.json(response);
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND).code });
      return res.json(response);
    }

    const tokenChecked = await checkToken(token);

    if (!tokenChecked) {
      logger.error(`Invalid email verification token.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.INVALID_EMAIL_VERIFICATION_TOKEN).message, status: getUserMessage(UserMessageKey.INVALID_EMAIL_VERIFICATION_TOKEN).code });
      return res.json(response);
    }

    await user.update({ verified: true });

    logger.info(`User's ${id} email successfully verified!`);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.EMAIL_VERIFIED).message, status: getUserMessage(UserMessageKey.EMAIL_VERIFIED).code });
    res.json(response);
  } catch (error) {
    logger.error('Failed to verify email:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED).message, status: getUserMessage(UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED).code });
    return res.json(response);
  }
};
