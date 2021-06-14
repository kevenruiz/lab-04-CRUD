import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Roblowe from '../lib/models/Roblowe.js';

describe('how many rob lowes does it take to rob Lowes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a rob lowes line to see how robs it takes via POST', async () => {
    const res = await request(app)
      .post('/api/v1/roblowes')
      .send({ how: 'many lowes would Rob lowe rob ', many: 'because Rob Lowe has many', times: 'oh, rob lowe' });

    expect(res.body).toEqual({
      id: '1',
      how: 'many lowes would Rob lowe rob ',
      many: 'because Rob Lowe has many',
      times: 'oh, rob lowe',
    });
  });

  it('finds a rob lowe who tried to rob lowe by id  via GET', async () => {
    const roblowe = await Roblowe.insert({
      how: 'many lowes would Rob lowe rob ',
      many: 'because Rob Lowe has many',
      times: 'oh, rob lowe',
    });

    const res = await request(app).get(`/api/v1/roblowes/${roblowe.id}`);

    expect(res.body).toEqual(roblowe);
  });


});

