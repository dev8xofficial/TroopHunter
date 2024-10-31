'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: true,
        type: Sequelize.ENUM('guest', 'user', 'admin'),
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

    await queryInterface.addIndex('Users', ['email'], {
      unique: true,
    });
    await queryInterface.addIndex('Users', ['firstName', 'lastName', 'email'], {
      unique: true,
    });

    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_user_email_constraint',
    });
    await queryInterface.addConstraint('Users', {
      fields: ['firstName', 'lastName', 'email'],
      type: 'unique',
      name: 'unique_user_first_name_last_name_email_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('Users', ['email']);
    await queryInterface.removeIndex('Users', ['firstName', 'lastName', 'email']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('Users', 'unique_user_email_constraint');
    await queryInterface.removeConstraint('Users', 'unique_user_first_name_last_name_email_constraint');

    // Drop the table
    await queryInterface.dropTable('Users');
  },
};
