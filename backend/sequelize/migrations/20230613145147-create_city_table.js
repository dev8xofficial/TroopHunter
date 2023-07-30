const { City } = require('country-state-city');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cities', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
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

    await queryInterface.addIndex('Cities', ['city'], {
      unique: true,
    });

    // Add a composite key constraint to the 'city' and 'state' columns
    await queryInterface.addConstraint('Cities', {
      fields: ['city'],
      type: 'unique',
      name: 'unique_city_constraint',
    });

    const allCities = City.getAllCities();
    let locationData = [];

    allCities.map((city) => {
      const existingLocation = locationData.find((loc) => loc.city === city.name);
      if (!existingLocation) {
        locationData.push({ id: uuidv4(), city: city.name });
      }
    });

    await queryInterface.bulkInsert('Cities', locationData);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('Cities', ['city']);
    // Drop foreign key constraints
    await queryInterface.removeConstraint('Cities', 'unique_city_constraint');

    // Drop the table
    await queryInterface.dropTable('Cities');
  },
};
