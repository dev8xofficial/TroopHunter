'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BusinessPhones', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
    
    // Add a unique constraint to the 'number' column
    await queryInterface.addConstraint('BusinessPhones', {
      fields: ['number'],
      type: 'unique',
      name: 'unique_number_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BusinessPhones');
  },
};
