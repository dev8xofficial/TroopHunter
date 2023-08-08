'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BusinessOpeningHours', {
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

    await queryInterface.addIndex('BusinessOpeningHours', ['time'], {
      unique: true,
    });

    // Add a unique constraint to the 'time' column
    await queryInterface.addConstraint('BusinessOpeningHours', {
      fields: ['time'],
      type: 'unique',
      name: 'unique_business_opening_time_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('BusinessOpeningHours', ['time']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('BusinessOpeningHours', 'unique_business_opening_time_constraint');

    // Drop the table
    await queryInterface.dropTable('BusinessOpeningHours');
  },
};
