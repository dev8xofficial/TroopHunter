import request from 'supertest';
import app from '../index';
import User from '../models/User/User.model';

describe('User Controller', () => {
  beforeEach(async () => {
    // Clear user table or perform any necessary setup
    await User.destroy({ truncate: true });
  });

  describe('POST /users', () => {
    test('should create a new user', async () => {
      const response = await request(app).post('/users').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.firstName).toBe('John');
      expect(response.body.lastName).toBe('Doe');
      expect(response.body.email).toBe('john.doe@example.com');
    });

    // Add more test cases for user creation endpoint
  });

  // Add more test cases for other user controller endpoints
});
