const { Country } = require('country-state-city');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Countries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      phoneCode: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(10),
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

    await queryInterface.addIndex('Countries', ['name', 'code'], {
      unique: true,
    });

    await queryInterface.addConstraint('Countries', {
      fields: ['name', 'code'],
      type: 'unique',
      name: 'unique_country_name_code_constraint',
    });

    const allCountries = Country.getAllCountries();
    let countryData = [];

    allCountries.map((country) => {
      const { name, isoCode, phonecode, currency, longitude, latitude } = country;
      const existingCountry = countryData.find((loc) => loc.name === name && loc.code === isoCode && loc.phoneCode === phonecode && loc.currency === currency);
      if (!existingCountry) {
        countryData.push({ id: uuidv4(), name, code: isoCode, phoneCode: phonecode, currency, longitude, latitude });
      }
    });

    await queryInterface.bulkInsert('Countries', countryData);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('Countries', ['name', 'code']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('Countries', 'unique_country_name_code_constraint');

    // Drop the table
    await queryInterface.dropTable('Countries');
  },
};
