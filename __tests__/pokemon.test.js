import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('Pokemon routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('posting a pokemon to pokemon using Post', async () => {
    const res = await request(app)
      .post('/api/v1/pokemon')
      .send({
        name: 'pikachu',
        type: 'electric',
        isEvolved: false,
      });
    expect(res.body).toEqual({
      id: '1',
      name: 'pikachu',
      type: 'electric',
      isEvolved: false,
    });
  });

});
