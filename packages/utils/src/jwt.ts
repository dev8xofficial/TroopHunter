import { sign, verify, type SignOptions, type JwtPayload } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

if (JWT_SECRET == null && typeof JWT_SECRET === 'string') {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

const OPTIONS: SignOptions = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

type IGenerateTokenPayload = Record<string, unknown>;

export const generateToken = async (object: IGenerateTokenPayload, options: SignOptions = OPTIONS): Promise<string> => {
  return await new Promise((resolve, reject) => {
    sign(object, JWT_SECRET as string, options, (error, token) => {
      if (error != null) {
        reject(error);
        return;
      }
      resolve(token as string);
    });
  });
};

export const checkToken = async (token: string): Promise<{ payload?: JwtPayload | string; error?: Error }> => {
  return await new Promise((resolve) => {
    verify(token, JWT_SECRET as string, (error, payload) => {
      if (error != null) {
        resolve({ error });
        return;
      }
      resolve({ payload });
    });
  });
};
