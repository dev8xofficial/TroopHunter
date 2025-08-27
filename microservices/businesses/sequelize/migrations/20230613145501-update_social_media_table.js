'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update the column definition
    await queryInterface.changeColumn('BusinessSocialMedia', 'businessId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Businesses',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    // Define foreign key constraints
    await queryInterface.addConstraint('BusinessSocialMedia', {
      fields: ['businessId'],
      type: 'foreign key',
      name: 'fk_business_social_media_business_id',
      references: {
        table: 'Businesses',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop foreign key constraints
    await queryInterface.removeConstraint('BusinessSocialMedia', 'fk_business_social_media_business_id');
  },
};
