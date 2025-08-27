import * as z from 'zod';

type InterfaceType =
  | 'ILoginRequestAttributes'
  | 'IBusinessAttributes'
  | 'IBusinessCategoryAttributes'
  | 'IBusinessClosingHourAttributes'
  | 'IBusinessOpeningHourAttributes'
  | 'IBusinessPhoneAttributes'
  | 'IBusinessPhotoAttributes'
  | 'IBusinessRatingAttributes'
  | 'IBusinessSocialMediaAttributes'
  | 'IBusinessSourceAttributes'
  | 'ICityAttributes'
  | 'ICountryAttributes'
  | 'IGeoPointAttributes'
  | 'ILeadAttributes'
  | 'ILeadBusinessAttributes'
  | 'IPaginationAttributes'
  | 'IPostalCodeAttributes'
  | 'IQueueAttributes'
  | 'IRequestAttributes'
  | 'IStateAttributes'
  | 'IUserAttributes'
  | 'ITimezoneAttributes'; // Choose the appropriate interface name

const convertSchemaToInterface = (schema: z.ZodObject<any>, interfaceType: InterfaceType): string => {
  const interfaceProperties: string[] = [];

  for (const property in schema.shape) {
    const zodType = schema.shape[property];
    let propertyType: string;

    if (zodType instanceof z.ZodString) {
      propertyType = 'string';
    } else if (zodType instanceof z.ZodNumber) {
      propertyType = 'number';
    } else if (zodType instanceof z.ZodBoolean) {
      propertyType = 'boolean';
    } else if (zodType instanceof z.ZodObject) {
      // Recursively convert nested objects
      const nestedInterface = convertSchemaToInterface(zodType, interfaceType);
      propertyType = nestedInterface;
    } else {
      propertyType = 'any'; // Default to any type for unsupported types
    }

    const interfaceProperty = `${property}${zodType.optional ? '?' : ''}: ${propertyType};`;
    interfaceProperties.push(interfaceProperty);
  }

  const interfaceDeclaration = `interface ${interfaceType} {\n  ${interfaceProperties.join('\n  ')}\n}`;

  return interfaceDeclaration;
};

export default convertSchemaToInterface;
