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
      areaCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      phoneNumberFormatted: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      notes: {
        type: Sequelize.STRING(255),
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BusinessPhones');
  },
};
