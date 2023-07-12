'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Leads', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      categoryId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      locationId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      postalCodeId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      phoneId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      website: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ratingId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      reviews: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      timezoneId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      openingHourId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      closingHourId: {
        allowNull: true,
        type: Sequelize.UUID,
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

    await queryInterface.addConstraint('Leads', {
      fields: ['ownerId'],
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Leads');
  },
};
