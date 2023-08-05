import { Request, Response } from 'express';
import User from '../../models/User/User.model';
import logger from '../../utils/logger';
import { ApiResponse } from '../../types/Response.interface';
import { IUserRequestAttributes } from '../../models/User/User.interface';
import { createApiResponse } from '../../utils/response';
import { UserMessageKey, getUserMessage } from '../../models/User/User.messages';
import { UserSchema, createUserErrorResponse } from '../../models/User/User.schema';

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { error: bodyError, value: validatedBodyData } = UserSchema.validate(req.body, { abortEarly: false });
  const { firstName, lastName, email, password, role } = validatedBodyData as IUserRequestAttributes;

  try {
    if (bodyError) {
      const errorResponse = createUserErrorResponse(bodyError);
      const response: ApiResponse<null> = createApiResponse({
        error: errorResponse.error,
        status: errorResponse.status,
      });
      return res.json(response);
    }

    const user = await User.findByPk(userId);

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.role = role;
      await user.save();

      // Log a success message
      logger.info(`Updated user with ID ${userId}.`);
      const response: ApiResponse<User> = createApiResponse({ success: true, data: user, message: getUserMessage(UserMessageKey.USER_UPDATED).message, status: getUserMessage(UserMessageKey.USER_UPDATED).code });
      res.json(response);
    } else {
      // Log a warning message
      logger.warn(`User with ID ${userId} not found.`);
      const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).code });
      res.json(response);
    }
  } catch (error) {
    // Log an error message
    logger.error(`Failed to update user with ID ${userId}:`, error);
    const response: ApiResponse<null> = createApiResponse({ error: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).message, status: getUserMessage(UserMessageKey.FAILED_TO_UPDATE_USER).code });
    res.json(response);
  }
};
