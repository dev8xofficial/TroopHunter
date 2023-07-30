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
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      stateCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      countryCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
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

    await queryInterface.addIndex('Cities', ['name', 'stateCode', 'countryCode'], {
      unique: true,
    });

    await queryInterface.addConstraint('Cities', {
      fields: ['name', 'stateCode', 'countryCode'],
      type: 'unique',
      name: 'unique_city_name_state_code_country_code_constraint',
    });

    const allCities = City.getAllCities();
    let cityData = [];

    allCities.map((city) => {
      const { name, stateCode, countryCode, longitude, latitude } = city;
      const existingCity = cityData.find((loc) => loc.name === name && loc.stateCode === stateCode && loc.countryCode === countryCode);
      if (!existingCity) {
        cityData.push({ id: uuidv4(), name, stateCode, countryCode, longitude, latitude });
      }
    });

    await queryInterface.bulkInsert('Cities', cityData);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('Cities', ['name', 'stateCode', 'countryCode']);
    // Drop foreign key constraints
    await queryInterface.removeConstraint('Cities', 'unique_city_name_state_code_country_code_constraint');

    // Drop the table
    await queryInterface.dropTable('Cities');
  },
};
