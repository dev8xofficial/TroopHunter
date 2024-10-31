'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ClosingHours', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING,
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

    function generateOpeningHours() {
      const times = [];
      
      for (let hour = 0; hour < 24; hour++) {
        for (let quarter = 0; quarter < 60; quarter += 15) {
          const formattedHour = String(hour).padStart(2, '0');
          const formattedMinute = String(quarter).padStart(2, '0');
          times.push({ id: uuidv4(), time: `${formattedHour}:${formattedMinute}` });
        }
      }

      times.push({ id: uuidv4(), time: '23:59' });
      return times;
    }
    
    const closingHours = generateOpeningHours();
    await queryInterface.bulkInsert('ClosingHours', closingHours);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ClosingHours');
  },
};
