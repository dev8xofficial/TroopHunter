'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Leads', [
      {
        id: 'b92963f6-932b-45ad-849c-07c9dd2fbbf6',
        title: 'Lead 1',
        ownerId: 'c3e09f94-2b0b-4a76-bce3-ee5a3452d320',
        category: 'Technology',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10001',
        phone: '+1 123-456-7890',
        email: 'lead1@example.com',
        website: 'https://www.lead1.com',
        rating: 4.2,
        reviews: 80,
        timezone: 'America/New_York',
        operatingStatus: 'open',
        openingTime: '09:00 AM',
        closingTime: '06:00 PM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '92d4a42b-ef36-481e-b2b9-3674d8d32a1d',
        title: 'Lead 2',
        ownerId: 'f0e34d26-3f9a-4e6b-8ec3-7f8acbcfe6a4',
        category: 'Retail',
        address: '456 Oak St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        postalCode: '90001',
        phone: '+1 987-654-3210',
        email: 'lead2@example.com',
        website: 'https://www.lead2.com',
        rating: 3.5,
        reviews: 60,
        timezone: 'America/Los_Angeles',
        operatingStatus: 'closed',
        openingTime: '10:00 AM',
        closingTime: '08:00 PM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more lead records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Leads', null, {});
  },
};
