import request from 'supertest';
import app from '../index';
import Business from '../models/RBusiness';

describe('Business Controller', () => {
  beforeEach(async () => {
    // Clear business table or perform any necessary setup
    await Business.destroy({ truncate: true });
  });

  describe('POST /businesses', () => {
    test('should create a new business', async () => {
      const response = await request(app).post('/businesses').send({
        name: 'Example Restaurant',
        address: '123 Main St',
        phone: '123-456-7890',
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Example Restaurant');
      expect(response.body.address).toBe('123 Main St');
      expect(response.body.phone).toBe('123-456-7890');
    });

    // Add more test cases for business creation endpoint
  });

  // Add more test cases for other business controller endpoints
});
