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
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      locationId: {
        type: Sequelize.UUID,
        allowNull: true,
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
      operatingStatusId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      socialMediaId: {
        type: Sequelize.UUID,
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
      fields: ['locationId'],
      type: 'foreign key',
      name: 'fk_business_location',
      references: {
        table: 'Locations',
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
      fields: ['operatingStatusId'],
      type: 'foreign key',
      name: 'fk_business_operatingstatus',
      references: {
        table: 'BusinessOperatingStatuses',
        field: 'id',
      },
      onDelete: 'SET NULL',
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
    // Drop foreign key constraints
    await queryInterface.removeConstraint('Businesses', 'fk_business_category');
    await queryInterface.removeConstraint('Businesses', 'fk_business_location');
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
