'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Leads', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE', // Choose the appropriate action for onDelete
        onUpdate: 'CASCADE', // Choose the appropriate action for onUpdate
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      search: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      businessDomain: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      categoryId: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cityId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Cities',
          key: 'id',
        },
        onDelete: 'CASCADE', // Choose the appropriate action for onDelete
        onUpdate: 'CASCADE', // Choose the appropriate action for onUpdate
      },
      stateId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'States',
          key: 'id',
        },
        onDelete: 'CASCADE', // Choose the appropriate action for onDelete
        onUpdate: 'CASCADE', // Choose the appropriate action for onUpdate
      },
      countryId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Countries',
          key: 'id',
        },
        onDelete: 'CASCADE', // Choose the appropriate action for onDelete
        onUpdate: 'CASCADE', // Choose the appropriate action for onUpdate
      },
      postalCodeId: {
        allowNull: true,
        type: Sequelize.UUID,
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
      sponsoredAd: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      businessCount: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_lead_user',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['cityId'],
      type: 'foreign key',
      name: 'fk_lead_city',
      references: {
        table: 'Cities',
        field: 'id',
      },
      onDelete: 'CASCADE', // Choose the appropriate action for onDelete
      onUpdate: 'CASCADE', // Choose the appropriate action for onUpdate
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['stateId'],
      type: 'foreign key',
      name: 'fk_lead_state',
      references: {
        table: 'States',
        field: 'id',
      },
      onDelete: 'CASCADE', // Choose the appropriate action for onDelete
      onUpdate: 'CASCADE', // Choose the appropriate action for onUpdate
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['countryId'],
      type: 'foreign key',
      name: 'fk_lead_country',
      references: {
        table: 'Countries',
        field: 'id',
      },
      onDelete: 'CASCADE', // Choose the appropriate action for onDelete
      onUpdate: 'CASCADE', // Choose the appropriate action for onUpdate
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop foreign key constraints
    await queryInterface.removeConstraint('Leads', 'fk_lead_user');
    await queryInterface.removeConstraint('Leads', 'fk_lead_city');
    await queryInterface.removeConstraint('Leads', 'fk_lead_state');
    await queryInterface.removeConstraint('Leads', 'fk_lead_country');
    
    // Drop the table
    await queryInterface.dropTable('Leads');
  },
};
