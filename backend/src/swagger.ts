import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import fs from 'fs';
import YAML from 'yamljs'; // Import the yamljs library

// Load the YAML file
const swaggerYAML = fs.readFileSync(path.join(__dirname, '../doc', 'swagger.yaml'), 'utf8'); // Update the path to load the YAML file from the root 'doc' folder

const options = {
  swaggerDefinition: YAML.parse(swaggerYAML), // Use YAML.parse to parse the YAML content
  apis: [path.join(__dirname, '../routes', '*.ts')], // Update the path to load the route files from the root 'routes' folder
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
