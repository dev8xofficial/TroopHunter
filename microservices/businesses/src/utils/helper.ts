// import { type Request, type Response, type NextFunction } from 'express';
// import qs from 'qs';

// export const parseFieldsAndApplySelection = (req: Request, res: Response, next: NextFunction) => {
//   const { fields }: any = req.query;

//   if (fields) {
//     try {
//       const parsedFields = qs.parse(fields);

//       const applyFieldSelection = (data: any, fields: any): any => {
//         if (Array.isArray(data)) {
//           return data.map((item) => applyFieldSelection(item, fields));
//         } else if (typeof data === 'object') {
//           const selectedData: any = {};
//           for (const field in fields) {
//             if (fields[field]) {
//               selectedData[field] = applyFieldSelection(data[field], fields[field]);
//             }
//           }
//           return selectedData;
//         } else {
//           return data;
//         }
//       };

//       // Apply field selection logic directly to the response data
//       res.locals.data = applyFieldSelection(res.locals.data, parsedFields);
//     } catch (error) {
//       return res.status(400).json({ error: 'Invalid fields query' });
//     }
//   }

//   next();
// };

export const isValidJSON = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};
