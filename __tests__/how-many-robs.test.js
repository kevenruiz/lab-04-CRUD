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

  it('finds all the robs before they go to lowes via GET', async () => {

    const robWhoRobbed = await Roblowe.insert({
      how: 'can a rob rob low lowes',
      many: 'of the times',
      times: 'undefined',
    });

    const robWhoIsJustRob = await Roblowe.insert({
      how: 'can ron not rob lowes',
      many: 'can this be true?',
      times: 'few in between',
    });

    const robFromLowes = await Roblowe.insert({
      how: 'can rob who robs rob lowe shop at lowes',
      many: 'of the times this always happens',
      times: 'all the time',
    });

    const res = await request(app).get('/api/v1/roblowes');

    expect(res.body).toEqual([robWhoRobbed, robWhoIsJustRob, robFromLowes]);

  });



});

