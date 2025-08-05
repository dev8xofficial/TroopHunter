// import dotenv from 'dotenv';
import { type Request, type Response, type NextFunction } from 'express';

// dotenv.config();

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

type ResponseData = Record<string, unknown> | Array<Record<string, unknown>>;

declare global {
  namespace Express {
    interface Response {
      sendSuccess: <T>(data: T) => Response;
    }
  }
}

export const formatResponse = <T>(req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = function <T>(data: T) {
    const response: ApiResponse<T> = {
      success: true,
      data,
    };
    res.json(response);
    return res;
  };

  next();
};

// // Function to remove sensitive properties from an object
// const removeSensitiveProps = (obj: Record<string, unknown>, sensitiveKeys: string[]): void => {
//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       if (sensitiveKeys.includes(key)) {
//         delete obj[key]; // Remove the sensitive property
//       } else if (typeof obj[key] === 'object' && obj[key] !== null) {
//         removeSensitiveProps(obj[key] as Record<string, unknown>, sensitiveKeys); // Recursively remove sensitive props
//       }
//     }
//   }
// };

// export const removeSensitiveData = (data: ResponseData, sensitiveKeys: string[]): ResponseData => {
//   if (Array.isArray(data)) {
//     // If data is an array, apply removeSensitiveProps to each object in the array
//     return data.map((item) => {
//       const clonedItem = { ...item }; // Clone the item
//       removeSensitiveProps(clonedItem, sensitiveKeys); // Remove sensitive properties from the item
//       return clonedItem;
//     });
//   } else {
//     // If data is a single object
//     const clonedData = { ...data }; // Clone the object
//     removeSensitiveProps(clonedData, sensitiveKeys); // Remove sensitive properties from the object
//     return clonedData;
//   }
// };

// export const sanitizeResponse = (req: Request, res: Response, next: NextFunction): void => {
//   const originalJson = res.json;
//   const sensitiveKeys = ['password'];

//   res.json = function (data: ResponseData) {
//     const secureKey = req.headers['exclude-response-sensitive-keys-secret'];
//     const expectedKey = process.env.EXCLUDE_RESPONSE_SENSITIVE_KEYS_SECRET ?? '';

//     // Sanitize data if the secure key is not valid
//     if (secureKey !== expectedKey) {
//       data = removeSensitiveData(data, sensitiveKeys);
//     }

//     return originalJson.call(this, data);
//   };

//   next();
// };

export const removeSensitiveData = (data: ResponseData, sensitiveKeys: string[]): ResponseData => {
  const clone = JSON.parse(JSON.stringify(data));

  const removeSensitiveProps = (obj: any) => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (sensitiveKeys.includes(key)) {
            delete obj[key];
          } else if (typeof obj[key] === 'object') {
            removeSensitiveProps(obj[key]);
          }
        }
      }
    }
  };

  removeSensitiveProps(clone);

  return clone;
};

export const sanitizeResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;
  // Whitelisted properties
  const sensitiveKeys = ['password'];

  res.json = function (data: ResponseData) {
    const modifiedData = removeSensitiveData(data, sensitiveKeys);
    return originalJson.call(this, modifiedData) as Response; // Cast the result to Response type
  };

  next();
};
