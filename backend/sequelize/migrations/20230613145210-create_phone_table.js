'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BusinessPhones', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      countryCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      regionCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      numberNationalFormatted: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      numberInternationalFormatted: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      numberType: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      isValid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addIndex('BusinessPhones', ['number', 'numberNationalFormatted', 'numberInternationalFormatted'], {
      unique: true,
    });

    // Add a unique constraint to the 'number' column
    await queryInterface.addConstraint('BusinessPhones', {
      fields: ['number'],
      type: 'unique',
      name: 'unique_business_number_constraint',
    });
    await queryInterface.addConstraint('BusinessPhones', {
      fields: ['numberNationalFormatted'],
      type: 'unique',
      name: 'unique_business_number_national_formatted_constraint',
    });
    await queryInterface.addConstraint('BusinessPhones', {
      fields: ['numberInternationalFormatted'],
      type: 'unique',
      name: 'unique_business_number_international_formatted_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('BusinessPhones', ['number', 'numberNationalFormatted', 'numberInternationalFormatted']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('BusinessPhones', 'unique_business_number_constraint');
    await queryInterface.removeConstraint('BusinessPhones', 'unique_business_number_national_formatted_constraint');
    await queryInterface.removeConstraint('BusinessPhones', 'unique_business_number_international_formatted_constraint');

    // Drop the table
    await queryInterface.dropTable('BusinessPhones');
  },
};
