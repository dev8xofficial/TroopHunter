'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Timezones', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      timezoneName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      utcOffset: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      dst: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      dstOffset: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      countryCode: {
        type: Sequelize.STRING(5),
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
    
    // Add a unique constraint to the 'timezoneName' column
    await queryInterface.addConstraint('Timezones', {
      fields: ['timezoneName'],
      type: 'unique',
      name: 'unique_timezoneName_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Timezones');
  }
};
