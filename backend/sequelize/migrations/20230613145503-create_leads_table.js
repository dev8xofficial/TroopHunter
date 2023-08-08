'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Leads', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      businessIds: {
        type: Sequelize.ARRAY(Sequelize.UUID),
        allowNull: true,
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
        lowercase: true,
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
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      stateId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'States',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      countryId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Countries',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'fk_lead_category',
      references: {
        table: 'BusinessCategories',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['cityId'],
      type: 'foreign key',
      name: 'fk_lead_city',
      references: {
        table: 'Cities',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['stateId'],
      type: 'foreign key',
      name: 'fk_lead_state',
      references: {
        table: 'States',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['countryId'],
      type: 'foreign key',
      name: 'fk_lead_country',
      references: {
        table: 'Countries',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['postalCodeId'],
      type: 'foreign key',
      name: 'fk_lead_postalcode',
      references: {
        table: 'PostalCodes',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['ratingId'],
      type: 'foreign key',
      name: 'fk_lead_rating',
      references: {
        table: 'BusinessRatings',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['timezoneId'],
      type: 'foreign key',
      name: 'fk_lead_timezone',
      references: {
        table: 'Timezones',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['openingHourId'],
      type: 'foreign key',
      name: 'fk_lead_openingtime',
      references: {
        table: 'BusinessOpeningHours',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addConstraint('Leads', {
      fields: ['closingHourId'],
      type: 'foreign key',
      name: 'fk_lead_closingtime',
      references: {
        table: 'BusinessClosingHours',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop foreign key constraints
    await queryInterface.removeConstraint('Leads', 'fk_lead_user');
    await queryInterface.removeConstraint('Businesses', 'fk_lead_category');
    await queryInterface.removeConstraint('Leads', 'fk_lead_city');
    await queryInterface.removeConstraint('Leads', 'fk_lead_state');
    await queryInterface.removeConstraint('Leads', 'fk_lead_country');
    await queryInterface.removeConstraint('Businesses', 'fk_lead_postalcode');
    await queryInterface.removeConstraint('Businesses', 'fk_lead_rating');
    await queryInterface.removeConstraint('Businesses', 'fk_lead_timezone');
    await queryInterface.removeConstraint('Businesses', 'fk_lead_openingtime');
    await queryInterface.removeConstraint('Businesses', 'fk_lead_closingtime');

    // Drop the table
    await queryInterface.dropTable('Leads');
  },
};
