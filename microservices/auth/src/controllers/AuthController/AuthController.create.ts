import fs from 'fs';
import path from 'path';

import { UserMessageKey, getUserMessage } from '@repo/messages';
import { type IHttpsAgentOptions } from '@repo/middlewares';
import { createUser, getUserByEmail, getUserById, updateUserPassword, updateUserVerified } from '@repo/services';
import { logger, checkToken, generateToken, sendEmail } from '@repo/utils';
import { type ApiResponse, type IResetPasswordAttributes, type IResetPasswordVerificationAttributes, type ISendVerificationTokenAttributes, type IUserAttributes, type IVerifyUserAttributes, createApiResponse } from '@repo/validator';
// import bcrypt from 'bcryptjs';
import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { emailTemplate } from '../../templates/emailTemplate';

const privateKey = fs.readFileSync(path.resolve(__dirname, '../../cert/auth-key.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname, '../../cert/auth-cert.pem'));
const caCertificate = fs.readFileSync(path.resolve(__dirname, '../../cert/ca-cert.pem'));

const httpsAgent: IHttpsAgentOptions = {
  key: privateKey,
  cert: certificate,
  ca: caCertificate,
  requestCert: true,
  rejectUnauthorized: true,
};

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { firstName, lastName, email, password } = req.body as IUserAttributes;

    // const existingUser = await User.findOne({ where: { email } });
    const existingUserResponse: ApiResponse<IUserAttributes | null> = await getUserByEmail({ email, ...httpsAgent });
    if (existingUserResponse.data != null) {
      logger.error(`User with email ${email} already exists.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.DUPLICATE_USER).message, status: getUserMessage(UserMessageKey.DUPLICATE_USER).code });
      return res.json(response);
    }

    // const requestData: Omit<IUserAttributes, 'Leads'> = { id: uuidv4(), firstName, lastName, email, password, verified: false };
    const requestData: IUserAttributes = { id: uuidv4(), firstName, lastName, email, password, verified: false };

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);
    // requestData.password = hashedPassword;

    // Create the user
    const userResponse: ApiResponse<IUserAttributes | null> = await createUser({ ...requestData, ...httpsAgent });
    if (userResponse.data == null) {
      const response: ApiResponse<null> = createApiResponse({ success: userResponse.success, data: userResponse.data, message: userResponse.message, status: userResponse.status });
      return res.json(response);
    }

    logger.info(`User with email ${email} registered successfully.`);

    const response: ApiResponse<IUserAttributes> = createApiResponse({ success: true, data: userResponse.data, message: getUserMessage(UserMessageKey.USER_CREATED).message, status: getUserMessage(UserMessageKey.USER_CREATED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Failed to create user:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_CREATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_CREATE_USER).code });
    return res.json(response);
  }
};

export const sendVerificationToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body as ISendVerificationTokenAttributes;

    const existingUserResponse: ApiResponse<IUserAttributes | null> = await getUserByEmail({ email, ...httpsAgent });
    if (existingUserResponse.data == null) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: existingUserResponse.message, status: existingUserResponse.status });
      return res.json(response);
    }

    const existingUser = existingUserResponse.data;
    const payload = {
      id: existingUser.id,
      email,
    };
    const token = await generateToken(payload, {
      expiresIn: '0.25h',
      algorithm: 'HS256',
    });

    const html = emailTemplate({
      logo: `${process.env.TROOPHUNTER_PUBLIC_URL ?? 'https://www.troophunter.com'}/logo/logo.png`,
      headerImage: `${process.env.TROOPHUNTER_PUBLIC_URL ?? 'https://www.troophunter.com'}/images/user-verification/user-verification-indigo.png`,
      link: `${process.env.TROOPHUNTER_PUBLIC_URL ?? 'https://www.troophunter.com'}/verify/${existingUser.id}/${token}`,
      firstName: existingUser.firstName,
      expireTime: `${0.25 * 60} minutes`,
      heading: 'Verify Your Email Address',
      preHeading: 'Thank you for signing up with TroopHunter! To complete your registration, we need to verify your email address. Simply click the button below to verify your account:',
      startParagraph: 'Thank you for signing up with TroopHunter! To complete your registration, we need to verify your email address. Simply click the button below to verify your account:',
      endingParagraph: 'If you did not create an account with TroopHunter, please ignore this email. ',
      buttonText: 'V E R I F Y&nbsp; &nbsp;N O W',
    });
    const emailResponse = sendEmail({
      to: email,
      subject: 'Verify Your Email Address',
      html,
      text: `
      Verify Your Email Address
      
      Hello ${existingUser.firstName},
      
      Thank you for signing up with TroopHunter! To complete your registration, we need to verify your email address. Simply click the button below to verify your account: 
      
      [VERIFY NOW](${process.env.TROOPHUNTER_PUBLIC_URL ?? 'https://www.troophunter.com'}/verify/${existingUser.id}/${token})

      Please note, for security reasons, this link will expire in 15 minutes. If the link has expired, you can request a new verification link by signing in to your account.
      
      If you did not create an account with TroopHunter, please ignore this email.  
      
      Thank you,
      The TroopHunter Team
      `,
    });

    logger.info(`Verify email: ${email}`);
    logger.info(`Email response: ${JSON.stringify(emailResponse)}`);

    const response: ApiResponse<IUserAttributes> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.VERIFY_EMAIL).message, status: getUserMessage(UserMessageKey.VERIFY_EMAIL).code });
    return res.json(response);
  } catch (error) {
    logger.error('Failed to send email verification token:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_SEND_EMAIL_VERIFICATION_TOKEN).message, status: getUserMessage(UserMessageKey.FAILED_TO_SEND_EMAIL_VERIFICATION_TOKEN).code });
    return res.json(response);
  }
};

export const verifyUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, token } = req.params as IVerifyUserAttributes;

    const userResponse: ApiResponse<IUserAttributes | null> = await getUserById({ id, ...httpsAgent });
    if (userResponse.data == null) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: userResponse.message, status: userResponse.status });
      return res.json(response);
    }

    const { error: tokenError } = await checkToken(token);
    if (tokenError != null) {
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

    const updatedUserResponse: ApiResponse<IUserAttributes | null> = await updateUserVerified({ id, verified: true, ...httpsAgent });
    if (updatedUserResponse.data == null) {
      logger.info(`User's ${id} email verification failed!`);
      const response: ApiResponse<null> = createApiResponse({ success: true, data: null, message: updatedUserResponse.message, status: updatedUserResponse.status });
      return res.json(response);
    }

    logger.info(`User's ${id} email successfully verified!`);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.EMAIL_VERIFIED).message, status: getUserMessage(UserMessageKey.EMAIL_VERIFIED).code });
    return res.json(response);
  } catch (error) {
    logger.error('Failed to verify email:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED).message, status: getUserMessage(UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED).code });
    return res.json(response);
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body as ISendVerificationTokenAttributes;

    // const existingUser = await User.findOne({ where: { email } });
    const existingUserResponse: ApiResponse<IUserAttributes | null> = await getUserByEmail({ email, ...httpsAgent });
    if (existingUserResponse.data == null) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: existingUserResponse.message, status: existingUserResponse.status });
      return res.json(response);
    }

    const existingUser = existingUserResponse.data;
    const payload = {
      id: existingUser.id,
      email,
    };
    const token = await generateToken(payload, {
      expiresIn: '0.25h',
      algorithm: 'HS256',
    });

    const html = emailTemplate({
      logo: `${process.env.TROOPHUNTER_PUBLIC_URL ?? 'https://www.troophunter.com'}/logo/logo.png`,
      headerImage: `${process.env.TROOPHUNTER_PUBLIC_URL ?? 'https://www.troophunter.com'}/images/forgot-password/forgot-password.png`,
      link: `${process.env.TROOPHUNTER_PUBLIC_URL ?? 'https://www.troophunter.com'}/reset-password/${existingUser.id}/${token}`,
      firstName: existingUser.firstName,
      expireTime: `${0.25 * 60} minutes`,
      heading: 'Reset Your Password',
      preHeading: 'We received a request to reset the password for your TroopHunter account. If this was you, please click the button below to reset your password:',
      startParagraph: 'We received a request to reset the password for your TroopHunter account. If this was you, please click the button below to reset your password:',
      endingParagraph: 'If you did not request a password reset with TroopHunter, please ignore this email.',
      buttonText: 'R E S E T &nbsp; &nbsp;P A S S W O R D',
    });
    const emailResponse = sendEmail({
      to: email,
      subject: 'Reset Your Password',
      html,
      text: `
      Reset Your Password
      
      Hello ${existingUser.firstName},
      
      We received a request to reset the password for your TroopHunter account. If this was you, please click the button below to reset your password: 
      
      [RESET PASSWORD](${process.env.TROOPHUNTER_PUBLIC_URL ?? 'https://www.troophunter.com'}/reset-password/${existingUser.id}/${token})

      Please note, for security reasons, this link will expire in 15 minutes. If the link has expired, you can request a new verification link by signing in to your account.
      
      If you did not request a password reset with TroopHunter, please ignore this email. 
      
      Thank you,
      The TroopHunter Team
      `,
    });

    logger.info(`Forgot Password: ${email}`);
    logger.info(`Forgot password response: ${JSON.stringify(emailResponse)}`);

    const response: ApiResponse<IUserAttributes> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.FORGOT_PASSWORD).message, status: getUserMessage(UserMessageKey.FORGOT_PASSWORD).code });
    return res.json(response);
  } catch (error) {
    logger.error('Failed to verify user:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_SEND_FORGOT_PASSWORD_TOKEN).message, status: getUserMessage(UserMessageKey.FAILED_TO_SEND_FORGOT_PASSWORD_TOKEN).code });
    return res.json(response);
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, token, password, newPassword, confirmPassword } = req.body as IResetPasswordAttributes;

    if (newPassword !== confirmPassword) {
      logger.error(`Reset passwords do not match.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.PASSWORD_MISMATCH).message, status: getUserMessage(UserMessageKey.PASSWORD_MISMATCH).code });
      return res.status(400).json(response);
    }

    // const user = await User.findByPk(id);
    const userResponse: ApiResponse<IUserAttributes | null> = await getUserById({ id, ...httpsAgent });
    if (userResponse.data == null) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: userResponse.message, status: userResponse.status });
      return res.status(404).json(response);
    }

    const { error: tokenError } = await checkToken(token);
    if (tokenError != null) {
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

    // const hashedPassword = await bcrypt.hash(newPassword, 10);

    // await user.update({ password: hashedPassword });
    const updatedUserResponse: ApiResponse<IUserAttributes | null> = await updateUserPassword({ id, password, newPassword, confirmPassword, ...httpsAgent });
    if (updatedUserResponse.data == null) {
      logger.info(`User's ${id} password failed to reset!`);
      const response: ApiResponse<null> = createApiResponse({ success: true, data: null, message: updatedUserResponse.message, status: updatedUserResponse.status });
      return res.json(response);
    }

    logger.info(`User's ${id} password has been successfully reset!`);

    const response: ApiResponse<null> = createApiResponse({ success: true, message: getUserMessage(UserMessageKey.RESET_PASSWORD_SUCCESS).message, status: getUserMessage(UserMessageKey.RESET_PASSWORD_SUCCESS).code });
    return res.json(response);
  } catch (error) {
    logger.error('Failed to reset password:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_RESET_PASSWORD_TOKEN).message, status: getUserMessage(UserMessageKey.FAILED_TO_RESET_PASSWORD_TOKEN).code });
    return res.status(500).json(response);
  }
};

export const resetPasswordVerification = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, token } = req.params as IResetPasswordVerificationAttributes;

    // const user = await User.findByPk(id);
    const userResponse: ApiResponse<IUserAttributes | null> = await getUserById({ id, ...httpsAgent });
    if (userResponse.data == null) {
      logger.error(`User not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: userResponse.message, status: userResponse.status });
      return res.json(response);
    }

    const { error: tokenError } = await checkToken(token);
    if (tokenError != null) {
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
    return res.json(response);
  } catch (error) {
    logger.error('Failed to verify reset password token:', error);

    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED).message, status: getUserMessage(UserMessageKey.EMAIL_VERIFICATION_TOKEN_FAILED).code });
    return res.json(response);
  }
};
