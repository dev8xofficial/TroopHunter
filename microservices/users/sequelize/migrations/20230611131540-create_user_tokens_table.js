'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserTokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      accessToken: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      refreshToken: {
        allowNull: true,
        type: Sequelize.STRING,
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

    await queryInterface.addIndex('UserTokens', ['userId', 'accessToken', 'refreshToken'], {
      unique: true,
    });

    await queryInterface.addConstraint('UserTokens', {
      fields: ['userId', 'accessToken', 'refreshToken'],
      type: 'unique',
      name: 'unique_user_token_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('UserTokens', ['userId', 'accessToken', 'refreshToken']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('UserTokens', 'unique_user_token_constraint');

    // Drop the table
    await queryInterface.dropTable('UserTokens');
  },
};
