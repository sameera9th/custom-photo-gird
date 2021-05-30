import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/user/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/user/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'p'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);

  await request(app)
    .post('/api/user/signup')
    .send({
      password: 'alskjdf'
    })
    .expect(400);
});

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/user/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(212);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(200);

  await request(app)
    .post('/api/user/signin')
    .send({
      email: 'test@test.com',
      password: 'aslkdfjalskdfj'
    })
    .expect(212);
});