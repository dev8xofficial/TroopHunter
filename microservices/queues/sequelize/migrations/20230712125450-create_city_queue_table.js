'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CityQueues', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      cityId: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: 'Cities',
        //   key: 'id',
        // },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      queueId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Queues',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      businessSourceId: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: 'BusinessSources',
        //   key: 'id',
        // },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending',
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

    await queryInterface.addIndex('CityQueues', ['cityId', 'queueId', 'businessSourceId'], {
      unique: true,
    });

    await queryInterface.addConstraint('CityQueues', {
      fields: ['cityId', 'queueId', 'businessSourceId'],
      type: 'unique',
      name: 'unique_city_queue_business_source_constraint',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('CityQueues', ['cityId', 'queueId', 'businessSourceId']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('CityQueues', 'unique_city_queue_business_source_constraint');

    // Drop the table
    await queryInterface.dropTable('CityQueues');
  },
};
