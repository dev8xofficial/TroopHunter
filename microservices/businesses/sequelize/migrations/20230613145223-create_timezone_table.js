'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Timezones', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      timezoneName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
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

    await queryInterface.addIndex('Timezones', ['timezoneName'], {
      unique: true,
    });

    // Add a unique constraint to the 'timezoneName' column
    await queryInterface.addConstraint('Timezones', {
      fields: ['timezoneName'],
      type: 'unique',
      name: 'unique_timezone_name_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('Timezones', ['timezoneName']);
    // Drop foreign key constraints
    await queryInterface.removeConstraint('Timezones', 'unique_timezone_name_constraint');

    // Drop the table
    await queryInterface.dropTable('Timezones');
  },
};
