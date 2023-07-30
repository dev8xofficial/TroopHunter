const { Country } = require('country-state-city');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Countries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addIndex('Countries', ['country'], {
      unique: true,
    });

    // Add a composite key constraint to the 'city' and 'state' columns with a custom name
    await queryInterface.addConstraint('Countries', {
      fields: ['country'],
      type: 'unique',
      name: 'unique_country_constraint', // Provide a custom name for the constraint
    });

    const allCountries = Country.getAllCountries();
    let locationData = [];

    allCountries.map((country) => {
      const existingLocation = locationData.find((loc) => loc.country === country.name);
      if (!existingLocation) {
        locationData.push({ id: uuidv4(), country: country.name });
      }
    });

    await queryInterface.bulkInsert('Countries', locationData);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('Countries', ['country']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('Countries', 'unique_country_constraint');

    // Drop the table
    await queryInterface.dropTable('Countries');
  },
};
