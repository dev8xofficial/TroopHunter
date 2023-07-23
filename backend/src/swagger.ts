import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import path from 'path';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend',
      version: '1.0.0',
      description: 'API documentation for Your Backend',
    },
    servers: [
      {
        url: 'http://localhost:50001',
      },
    ],
  },
  apis: [path.join(__dirname, 'routes', '*.ts')],
};

const swaggerSpec = swaggerJSDoc(options);
console.log('swaggerSpec: ', swaggerSpec);

export default swaggerSpec;
