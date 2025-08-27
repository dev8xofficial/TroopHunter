import fs from 'fs';
import path from 'path';

import swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yamljs';

const swaggerYAML = fs.readFileSync(path.join(__dirname, '../doc', 'swagger.yaml'), 'utf8');

const options = {
  swaggerDefinition: YAML.parse(swaggerYAML),
  apis: [path.join(__dirname, '../routes', '*.ts')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
