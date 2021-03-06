import setup from '../data/setup.js';
import pool from '../lib/utils/pool.js';
import request from 'supertest';
import app from '../lib/app.js';
import Vegetable from '../lib/models/Vegetables.js';




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

  it('finds a vegetable by id via GET', async () => {
    const vegetable = await Vegetable.insert({
      name: 'corn',
      color: 'yellow',
    });
    const res = await request(app).get(`/api/v1/vegetables/${vegetable.id}`);
    expect(res.body).toEqual(vegetable);
  });

  it(' finds all dogs via GET', async () => {
    const vegetable1 = await Vegetable.insert({
      name: 'onion',
      color: 'purple',
    });
    const vegetable2 = await Vegetable.insert({
      name: 'jalapeno',
      color: 'green',
    });
    const vegetable3 = await Vegetable.insert({
      name: 'tomato',
      color: 'red',
    });

    const res = await request(app).get('/api/v1/vegetables');
    expect(res.body).toEqual([vegetable1, vegetable2, vegetable3]);
  });

  it('deletes a tomato', async () => {
    const vegetableToDelete = await Vegetable.insert({
      name: 'tomato',
      color: 'red',
    });
    const res = await request(app).delete(`/api/v1/vegetables/${vegetableToDelete.id}`);
    expect(res.body).toEqual(vegetableToDelete);
  });

  it('updates a vegetable', async () => {
    const firstVeggie = await Vegetable.insert({
      name: 'apple',
      color: 'white',
    });
    const changedVeggie = ({
      id: '1',
      name: 'Just kidding I am celery',
      color: 'green'
    });

    const res = await request(app).put(`/api/v1/vegetables/${firstVeggie.id}`).send(changedVeggie);
    expect(res.body).toEqual(changedVeggie);
  });


});
