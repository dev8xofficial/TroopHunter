const { Country, State, City } = require('country-state-city');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Locations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      importance: {
        type: Sequelize.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Low',
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

    // Add a composite key constraint to the 'city' and 'state' columns
    await queryInterface.addConstraint('Locations', {
      fields: ['city', 'state', 'country'],
      type: 'unique',
      name: 'unique_city_state_constraint',
    });

    const allCountries = Country.getAllCountries();
    const locationData = [];

    allCountries.forEach((country) => {
      const countryStates = State.getStatesOfCountry(country.isoCode);
      countryStates.forEach((state) => {
        const stateCities = City.getCitiesOfState(country.isoCode, state.isoCode);
        stateCities.forEach((city) => {
          const existingLocation = locationData.find((loc) => loc.city === city && loc.state === state);

          if (!existingLocation) {
            const id = uuidv4();
            locationData.push({
              id,
              city: city.name,
              state: state.name,
              country: country.name,
            });
          }
        });
      });
    });

    await queryInterface.bulkInsert('Locations', locationData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Locations');
  },
};
