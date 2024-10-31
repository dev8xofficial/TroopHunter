'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostalCodes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      code: {
        type: Sequelize.STRING(20),
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

    await queryInterface.addIndex('PostalCodes', ['code'], {
      unique: true,
    });

    // Add a unique constraint to the 'code' column
    await queryInterface.addConstraint('PostalCodes', {
      fields: ['code'],
      type: 'unique',
      name: 'unique_postal_code_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('PostalCodes', ['code']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('PostalCodes', 'unique_postal_code_constraint');

    // Drop the table
    await queryInterface.dropTable('PostalCodes');
  },
};
