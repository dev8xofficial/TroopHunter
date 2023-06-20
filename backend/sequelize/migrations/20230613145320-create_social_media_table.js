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
        allowNull: true,
      },
      twitterProfile: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      instagramProfile: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      linkedInProfile: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      youTubeProfile: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
