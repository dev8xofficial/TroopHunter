'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Businesses', [
      {
        id: '4d7e5ecf-9877-4420-b694-4d7175dfc34b',
        name: 'ABC Company',
        description: 'Lorem ipsum dolor sit amet.',
        category: 'Technology',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10001',
        phone: '+1 123-456-7890',
        email: 'info@abc.com',
        website: 'https://www.abc.com',
        rating: 4.5,
        reviews: 100,
        timezone: 'America/New_York',
        photos: ['photo1.jpg', 'photo2.jpg'],
        source: 'Google',
        operatingStatus: 'open',
        socialMedia: ['facebook.com/abc', 'twitter.com/abc'],
        openingTime: '09:00 AM',
        closingTime: '06:00 PM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6470e36c-8e8d-4d62-940f-d8b62095f875',
        name: 'XYZ Company',
        description: 'Lorem ipsum dolor sit amet.',
        category: 'Retail',
        address: '456 Oak St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        postalCode: '90001',
        phone: '+1 987-654-3210',
        email: 'info@xyz.com',
        website: 'https://www.xyz.com',
        rating: 3.8,
        reviews: 50,
        timezone: 'America/Los_Angeles',
        photos: ['photo3.jpg', 'photo4.jpg'],
        source: 'Yelp',
        operatingStatus: 'closed',
        socialMedia: ['instagram.com/xyz', 'linkedin.com/xyz'],
        openingTime: '10:00 AM',
        closingTime: '08:00 PM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more business records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Businesses', null, {});
  },
};
