'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Define the sources you want to check and insert
    const sources = [
      { sourceName: 'google-maps' },
      { sourceName: 'google-places-api' },
    ];

    for (const source of sources) {
      // Check if the source already exists
      const [results] = await queryInterface.sequelize.query(`
        SELECT id FROM "BusinessSources" WHERE "sourceName" = :sourceName
      `, {
        replacements: { sourceName: source.sourceName },
      });

      // If it doesn't exist, insert it
      if (results.length === 0) {
        await queryInterface.bulkInsert('BusinessSources', [{
          id: uuidv4(),
          sourceName: source.sourceName,
          createdAt: new Date(),
          updatedAt: new Date(),
        }]);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the inserted sources if necessary
    await queryInterface.bulkDelete('BusinessSources', {
      sourceName: {
        [Sequelize.Op.in]: ['google-maps', 'google-places-api'],
      }
    });
  },
};
