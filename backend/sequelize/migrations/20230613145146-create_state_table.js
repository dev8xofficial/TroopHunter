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
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      countryCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
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

    await queryInterface.addIndex('States', ['name', 'code', 'countryCode'], {
      unique: true,
    });

    await queryInterface.addConstraint('States', {
      fields: ['name', 'code', 'countryCode'],
      type: 'unique',
      name: 'unique_state_name_code_country_code_constraint',
    });

    const allStates = State.getAllStates();
    let stateData = [];

    allStates.map((state) => {
      const { name, isoCode, countryCode, longitude, latitude } = state;
      const existingState = stateData.find((loc) => loc.name === name && loc.code === isoCode && loc.countryCode === countryCode);
      if (!existingState) {
        stateData.push({ id: uuidv4(), name, code: isoCode, countryCode, longitude, latitude });
      }
    });

    await queryInterface.bulkInsert('States', stateData);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('States', ['name', 'code', 'countryCode']);
    // Drop foreign key constraints
    await queryInterface.removeConstraint('States', 'unique_state_name_code_country_code_constraint');

    // Drop the table
    await queryInterface.dropTable('States');
  },
};
