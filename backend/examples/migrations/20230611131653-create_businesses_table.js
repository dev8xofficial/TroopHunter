'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      category: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      state: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      postalCode: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      website: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      rating: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      reviews: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      timezone: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      photos: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      source: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      operatingStatus: {
        allowNull: true,
        type: Sequelize.ENUM('open', 'closed', 'temporarily closed'),
      },
      socialMedia: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      openingTime: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      closingTime: {
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Businesses');
  },
};
