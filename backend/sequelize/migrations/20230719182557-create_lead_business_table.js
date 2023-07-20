'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LeadBusinesses', {
      leadId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      businessId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
    });

    await queryInterface.addIndex('LeadBusinesses', ['leadId', 'businessId'], {
      unique: true,
    });

    await queryInterface.addConstraint('LeadBusinesses', {
      fields: ['leadId'],
      type: 'foreign key',
      name: 'fk_lead_business_lead',
      references: {
        table: 'Leads',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('LeadBusinesses', {
      fields: ['businessId'],
      type: 'foreign key',
      name: 'fk_lead_business_business',
      references: {
        table: 'Businesses',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('LeadBusinesses', ['leadId', 'businessId']);

    // Drop foreign key constraints
    await queryInterface.removeConstraint('LeadBusinesses', 'fk_lead_business_lead');
    await queryInterface.removeConstraint('LeadBusinesses', 'fk_lead_business_business');

    // Drop the table
    await queryInterface.dropTable('LeadBusinesses');
  },
};
