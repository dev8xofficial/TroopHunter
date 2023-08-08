'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BusinessCategories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
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

    await queryInterface.addIndex('BusinessCategories', ['name'], {
      unique: true,
    });

    await queryInterface.addConstraint('BusinessCategories', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_business_category_name_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('BusinessCategories', ['name']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('BusinessCategories', 'unique_business_category_name_constraint');

    // Drop the table
    await queryInterface.dropTable('BusinessCategories');
  },
};
