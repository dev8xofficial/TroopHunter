import { sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

const OPTIONS: SignOptions = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

interface IGenerateTokenPayload {
  [key: string]: any;
}

export const generateToken = (
  object: IGenerateTokenPayload,
  options: SignOptions = OPTIONS
): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign(object, JWT_SECRET as string, options, (error, token) => {
      if (error) return reject(error);
      return resolve(token as string);
    });
  });
};

export const checkToken = (token: string): Promise<JwtPayload | string> => {
  return new Promise((resolve, reject) => {
    verify(token, JWT_SECRET as string, (error, payload) => {
      if (error) return reject(error);
      return resolve(payload as JwtPayload | string);
    });
  });
};
