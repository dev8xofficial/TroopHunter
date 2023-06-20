'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BusinessSocialMedia', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      businessId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      facebookProfile: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      twitterProfile: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      instagramProfile: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      linkedInProfile: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      youTubeProfile: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
    await queryInterface.dropTable('BusinessSocialMedia');
  },
};
