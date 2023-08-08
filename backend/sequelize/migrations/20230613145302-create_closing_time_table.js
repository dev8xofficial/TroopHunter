'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BusinessClosingHours', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
        unique: true,
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

    await queryInterface.addIndex('BusinessClosingHours', ['time'], {
      unique: true,
    });

    // Add a unique constraint to the 'time' column
    await queryInterface.addConstraint('BusinessClosingHours', {
      fields: ['time'],
      type: 'unique',
      name: 'unique_business_closing_time_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('BusinessClosingHours', ['time']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('BusinessClosingHours', 'unique_business_closing_time_constraint');

    // Drop the table
    await queryInterface.dropTable('BusinessClosingHours');
  },
};
