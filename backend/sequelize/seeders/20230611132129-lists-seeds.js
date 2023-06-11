'use strict';

const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Lists', [
      {
        id: '1a091c5d-5c1e-4c2f-bc45-c6fd65de49f7',
        titles: 'List 1',
        ownerId: 'c3e09f94-2b0b-4a76-bce3-ee5a3452d320',
        leads: Sequelize.literal(`ARRAY['b92963f6-932b-45ad-849c-07c9dd2fbbf6']::uuid[]`),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '9dbca89b-8f11-47b3-b3b6-81ef572fb8d1',
        titles: 'List 2',
        ownerId: 'f0e34d26-3f9a-4e6b-8ec3-7f8acbcfe6a4',
        leads: Sequelize.literal(`ARRAY['92d4a42b-ef36-481e-b2b9-3674d8d32a1d']::uuid[]`),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more list records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lists', null, {});
  },
};
