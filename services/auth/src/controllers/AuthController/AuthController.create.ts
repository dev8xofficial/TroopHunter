import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import logger from '../../utils/logger';
import { ApiResponse, IResetPasswordAttributes, ISendVerificationTokenAttributes, IUserAttributes } from 'validator/interfaces';
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
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).code });
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

    const html = verifyEmail(`${process.env.FRONTEND_URL}/verify/${existingUser.id}/${token}`);
    const emailResponse = sendEmail(email, 'Verify Your Email', html);

    logger.info(`Verify email: ${email}`);
    logger.info(`Email response: ${emailResponse}`);

    const response: ApiResponse<User> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.VERIFY_EMAIL).message, status: getUserMessage(UserMessageKey.VERIFY_EMAIL).code });
    res.json(response);
  } catch (error) {
    logger.error('Failed to send email verification token:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_SEND_EMAIL_VERIFICATION_TOKEN).message, status: getUserMessage(UserMessageKey.FAILED_TO_SEND_EMAIL_VERIFICATION_TOKEN).code });
    return res.json(response);
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).code });
      return res.json(response);
    }

    const { error: tokenError } = await checkToken(token);
    if (tokenError) {
      if (tokenError.name === 'TokenExpiredError') {
        logger.error(`Expired email verification token.`);
        const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.EXPIRED_EMAIL_VERIFICATION_TOKEN).message, status: getUserMessage(UserMessageKey.EXPIRED_EMAIL_VERIFICATION_TOKEN).code });
        return res.json(response);
      } else {
        logger.error(`Invalid email verification token.`);
        const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.INVALID_EMAIL_VERIFICATION_TOKEN).message, status: getUserMessage(UserMessageKey.INVALID_EMAIL_VERIFICATION_TOKEN).code });
        return res.json(response);
      }
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

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email }: ISendVerificationTokenAttributes = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).code });
      return res.json(response);
    }

    const payload = {
      id: existingUser.id,
      email,
    };
    const token = await generateToken(payload, {
      expiresIn: '0.05h',
      algorithm: 'HS256',
    });

    const html = verifyEmail(`${process.env.FRONTEND_URL}/reset-password/${existingUser.id}/${token}`);
    const emailResponse = sendEmail(email, 'Reset Your Password', html);

    logger.info(`Forgot Password: ${email}`);
    logger.info(`Forgot password response: ${emailResponse}`);

    const response: ApiResponse<User> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.FORGOT_PASSWORD).message, status: getUserMessage(UserMessageKey.FORGOT_PASSWORD).code });
    res.json(response);
  } catch (error) {
    logger.error('Failed to verify user:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_SEND_FORGOT_PASSWORD_TOKEN).message, status: getUserMessage(UserMessageKey.FAILED_TO_SEND_FORGOT_PASSWORD_TOKEN).code });
    return res.json(response);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { id, token, newPassword, confirmPassword }: IResetPasswordAttributes = req.body;

    if (newPassword !== confirmPassword) {
      logger.error(`Reset passwords do not match.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.PASSWORD_MISMATCH).message, status: getUserMessage(UserMessageKey.PASSWORD_MISMATCH).code });
      return res.status(400).json(response);
    }

    const user = await User.findByPk(id);
    if (!user) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).code });
      return res.status(404).json(response);
    }

    const { error: tokenError } = await checkToken(token);
    if (tokenError) {
      if (tokenError.name === 'TokenExpiredError') {
        logger.error(`Expired reset password verification token.`);
        const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.EXPIRED_RESET_PASSWORD_VERIFICATION_TOKEN).message, status: getUserMessage(UserMessageKey.EXPIRED_RESET_PASSWORD_VERIFICATION_TOKEN).code });
        return res.json(response);
      } else {
        logger.error(`Invalid reset password verification token.`);
        const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.INVALID_RESET_PASSWORD_VERIFICATION_TOKEN).message, status: getUserMessage(UserMessageKey.INVALID_RESET_PASSWORD_VERIFICATION_TOKEN).code });
        return res.json(response);
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    logger.info(`User's ${id} password has been successfully reset!`);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.RESET_PASSWORD_SUCCESS).message, status: getUserMessage(UserMessageKey.RESET_PASSWORD_SUCCESS).code });
    return res.json(response);
  } catch (error) {
    logger.error('Failed to reset password:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RESET_PASSWORD_TOKEN).message, status: getUserMessage(UserMessageKey.FAILED_TO_RESET_PASSWORD_TOKEN).code });
    return res.status(500).json(response);
  }
};

export const resetPasswordVerification = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).message, status: getUserMessage(UserMessageKey.USER_NOT_FOUND_BY_ID).code });
      return res.json(response);
    }

    const { error: tokenError } = await checkToken(token);
    if (tokenError) {
      if (tokenError.name === 'TokenExpiredError') {
        logger.error(`Expired reset password verification token.`);
        const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.EXPIRED_RESET_PASSWORD_VERIFICATION_TOKEN).message, status: getUserMessage(UserMessageKey.EXPIRED_RESET_PASSWORD_VERIFICATION_TOKEN).code });
        return res.json(response);
      } else {
        logger.error(`Invalid reset password verification token.`);
        const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.INVALID_RESET_PASSWORD_VERIFICATION_TOKEN).message, status: getUserMessage(UserMessageKey.INVALID_RESET_PASSWORD_VERIFICATION_TOKEN).code });
        return res.json(response);
      }
    }

    logger.info(`User's ${id} reset password token successfully verified!`);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.RESET_PASSWORD_TOKEN_VERIFIED).message, status: getUserMessage(UserMessageKey.RESET_PASSWORD_TOKEN_VERIFIED).code });
    res.json(response);
  } catch (error) {
    logger.error('Failed to verify reset password token:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED).message, status: getUserMessage(UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED).code });
    return res.json(response);
  }
};
