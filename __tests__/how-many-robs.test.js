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

  it('deletes robLowe', async () => {
    const robLowe = await Roblowe.insert({
      how: 'can rob who robs rob lowe shop at lowes',
      many: 'of the times this always happens',
      times: 'all the time',
    });


    const res = await request(app).delete(`/api/v1/roblowes/${robLowe.id}`);

    expect(res.body).toEqual(robLowe);


  });

  it('updates a rob low', async () => {
    const firstRob = await Roblowe.insert({
      how: 'many Lows would Rob Lowe rob if Rob Lowe could rob Lowes',
      many: '3',
      times: 'all the time',
    });
    const changedRob = ({
      id: '1',
      how: 'Not to ROB your thunder but I think the number would be low',
      many: 'Did you just Rob his showerthought? Thats a new Lowe even for you.',
      times: 'reddit robbed me from sleep, sorry dan was just having fun with this one',
    });

    const res = await request(app).put(`/api/v1/roblowes/${firstRob.id}`).send(changedRob);
    expect(res.body).toEqual(changedRob);
  });



});

