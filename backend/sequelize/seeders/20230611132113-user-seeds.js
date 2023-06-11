'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 'c3e09f94-2b0b-4a76-bce3-ee5a3452d320',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password1',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f0e34d26-3f9a-4e6b-8ec3-7f8acbcfe6a4',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'password2',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more user records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
