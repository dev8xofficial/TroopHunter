'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add the businessSourceId column as nullable
    await queryInterface.addColumn('CityQueues', 'businessSourceId', {
      type: Sequelize.UUID,
      allowNull: true, // Allow NULL initially to handle existing records
      references: {
        model: 'BusinessSources',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Step 2: Fetch businessSourceId where sourceName is 'google-maps'
    const [results] = await queryInterface.sequelize.query(`
      SELECT id FROM "BusinessSources" WHERE "sourceName" = 'google-maps'
    `);

    const businessSourceId = results.length > 0 ? results[0].id : null;

    // Step 3: Update existing rows in CityQueues with the businessSourceId
    if (businessSourceId) {
      await queryInterface.sequelize.query(`
        UPDATE "CityQueues" 
        SET "businessSourceId" = '${businessSourceId}' 
        WHERE "businessSourceId" IS NULL
      `);
    } else {
      throw new Error('No business source found with the name "google-maps".');
    }

    // Step 4: Alter the column to be non-nullable now that all NULLs are filled
    await queryInterface.changeColumn('CityQueues', 'businessSourceId', {
      type: Sequelize.UUID,
      allowNull: false, // Now set to false after filling NULLs
      references: {
        model: 'BusinessSources',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Step 5: Remove the old unique constraint on cityId + queueId
    await queryInterface.removeConstraint('CityQueues', 'unique_city_queues_constraint');
    await queryInterface.removeIndex('CityQueues', ['cityId', 'queueId']);

    // Step 6: Add a new unique constraint on cityId, queueId, and businessSourceId
    await queryInterface.addConstraint('CityQueues', {
      fields: ['cityId', 'queueId', 'businessSourceId'],
      type: 'unique',
      name: 'unique_city_queue_business_source_constraint',
    });

    // Step 7: Create an index for businessSourceId
    await queryInterface.addIndex('CityQueues', ['cityId', 'queueId', 'businessSourceId'], {
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the unique constraint first
    await queryInterface.removeConstraint('CityQueues', 'unique_city_queue_business_source_constraint');

    // Re-add the original unique constraint on cityId + queueId
    await queryInterface.addConstraint('CityQueues', {
      fields: ['cityId', 'queueId'],
      type: 'unique',
      name: 'unique_city_queues_constraint',
    });

    // Drop the index for businessSourceId
    await queryInterface.removeIndex('CityQueues', ['cityId', 'queueId', 'businessSourceId']);
    await queryInterface.addIndex('CityQueues', ['cityId', 'queueId'], {
      unique: true,
    });

    // Remove the businessSourceId column
    await queryInterface.removeColumn('CityQueues', 'businessSourceId');
  },
};
