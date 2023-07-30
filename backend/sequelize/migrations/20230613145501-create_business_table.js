'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Businesses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      businessDomain: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      cityId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      stateId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      countryId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      geoPoint: {
        type: Sequelize.GEOMETRY('POINT', 4326),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      postalCodeId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      phoneId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(254),
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      ratingId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      reviews: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      timezoneId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      sourceId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      socialMediaId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      sponsoredAd: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      openingHourId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      closingHourId: {
        type: Sequelize.UUID,
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

    await queryInterface.addIndex('Businesses', ['name', 'address'], {
      unique: true,
    });

    // Define foreign key constraints
    await queryInterface.addConstraint('Businesses', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'fk_business_category',
      references: {
        table: 'BusinessCategories',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['cityId'],
      type: 'foreign key',
      name: 'fk_business_city',
      references: {
        table: 'Cities',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['stateId'],
      type: 'foreign key',
      name: 'fk_business_state',
      references: {
        table: 'States',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['countryId'],
      type: 'foreign key',
      name: 'fk_business_country',
      references: {
        table: 'Countries',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['postalCodeId'],
      type: 'foreign key',
      name: 'fk_business_postalcode',
      references: {
        table: 'PostalCodes',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['phoneId'],
      type: 'foreign key',
      name: 'fk_business_phone',
      references: {
        table: 'BusinessPhones',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['ratingId'],
      type: 'foreign key',
      name: 'fk_business_rating',
      references: {
        table: 'BusinessRatings',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['timezoneId'],
      type: 'foreign key',
      name: 'fk_business_timezone',
      references: {
        table: 'Timezones',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['sourceId'],
      type: 'foreign key',
      name: 'fk_business_source',
      references: {
        table: 'BusinessSources',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['socialMediaId'],
      type: 'foreign key',
      name: 'fk_business_socialmedia',
      references: {
        table: 'BusinessSocialMedia',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['openingHourId'],
      type: 'foreign key',
      name: 'fk_business_openingtime',
      references: {
        table: 'BusinessOpeningHours',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Businesses', {
      fields: ['closingHourId'],
      type: 'foreign key',
      name: 'fk_business_closingtime',
      references: {
        table: 'BusinessClosingHours',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('Businesses', ['name', 'address']);
    // Drop foreign key constraints
    await queryInterface.removeConstraint('Businesses', 'fk_business_category');
    await queryInterface.removeConstraint('Businesses', 'fk_business_city');
    await queryInterface.removeConstraint('Businesses', 'fk_business_state');
    await queryInterface.removeConstraint('Businesses', 'fk_business_country');
    await queryInterface.removeConstraint('Businesses', 'fk_business_postalcode');
    await queryInterface.removeConstraint('Businesses', 'fk_business_phone');
    await queryInterface.removeConstraint('Businesses', 'fk_business_rating');
    await queryInterface.removeConstraint('Businesses', 'fk_business_timezone');
    await queryInterface.removeConstraint('Businesses', 'fk_business_source');
    await queryInterface.removeConstraint('Businesses', 'fk_business_operatingstatus');
    await queryInterface.removeConstraint('Businesses', 'fk_business_socialmedia');
    await queryInterface.removeConstraint('Businesses', 'fk_business_openingtime');
    await queryInterface.removeConstraint('Businesses', 'fk_business_closingtime');

    // Drop the table
    await queryInterface.dropTable('Businesses');
  },
};
