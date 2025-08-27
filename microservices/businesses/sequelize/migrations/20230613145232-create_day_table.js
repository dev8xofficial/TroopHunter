'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Days', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      day: {
        type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
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

    const days = [{ id: uuidv4(), day: 'Monday' }, { id: uuidv4(), day: 'Tuesday' }, { id: uuidv4(), day: 'Wednesday' }, { id: uuidv4(), day: 'Thursday' }, { id: uuidv4(), day: 'Friday' }, { id: uuidv4(), day: 'Saturday' }, { id: uuidv4(), day: 'Sunday' }];
    await queryInterface.bulkInsert('Days', days);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Days');
  },
};
