import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should sign up a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('message', 'User registered successfully');
        expect(res.body).toHaveProperty('userId');
      });
  });

  it('should login a user', async () => {
    // First, sign up a user
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Jane',
        email: 'jane@example.com',
        password: 'password123',
      });

    // Then, try to login
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'jane@example.com',
        password: 'password123',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});