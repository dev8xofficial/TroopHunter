'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BusinessRatings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ratingValue: {
        allowNull: false,
        type: Sequelize.FLOAT(2, 1),
        unique: true
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING(50),
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
    
    // Add a unique constraint to the 'ratingValue' column
    await queryInterface.addConstraint('BusinessRatings', {
      fields: ['ratingValue'],
      type: 'unique',
      name: 'unique_ratingValue_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BusinessRatings');
  },
};
