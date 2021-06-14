import setup from '../data/setup.js';
import pool from '../lib/utils/pool.js';
import request from 'supertest';
import app from '../lib/app.js';




describe('vegetable routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a vegetable via POST', async () => {
    const res = await request(app)
      .post('/api/v1/vegetables')
      .send({ name: 'tomato', color: 'red' });

    expect(res.body).toEqual({
      id: '1',
      name: 'tomato',
      color: 'red',
    });
  });

});
