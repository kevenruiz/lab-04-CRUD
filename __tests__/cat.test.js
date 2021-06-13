import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cat from '../lib/models/Cat.js';

describe('Cat Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('posting a cat to a table, using POST', async () => {
    const res = await request(app)
      .post('/api/v1/cats')
      .send({ name: 'whiskers', color: 'Orange', age: 5 });

    expect(res.body).toEqual({
      id: '1',
      name: 'whiskers',
      color: 'Orange',
      age: 5,
    });


  });
  it('finds a cat by id via GET', async () => {
    const cat = await Cat.insert({
      name: 'Kitty',
      color: 'brown',
      age: 14,
    });

    const res = await request(app).get(`/api/v1/cats/${cat.id}`);

    expect(res.body).toEqual(cat);
  });



});
