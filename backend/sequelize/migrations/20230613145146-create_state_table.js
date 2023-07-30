const { State } = require('country-state-city');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('States', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
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

    await queryInterface.addIndex('States', ['state'], {
      unique: true,
    });

    // Add a composite key constraint to the 'city' and 'state' columns
    await queryInterface.addConstraint('States', {
      fields: ['state'],
      type: 'unique',
      name: 'unique_state_constraint',
    });

    const allStates = State.getAllStates();
    let locationData = [];

    allStates.map((state) => {
      const existingLocation = locationData.find((loc) => loc.state === state.name);
      if (!existingLocation) {
        locationData.push({ id: uuidv4(), state: state.name });
      }
    });

    await queryInterface.bulkInsert('States', locationData);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('States', ['state']);
    // Drop foreign key constraints
    await queryInterface.removeConstraint('States', 'unique_state_constraint');

    // Drop the table
    await queryInterface.dropTable('States');
  },
};
