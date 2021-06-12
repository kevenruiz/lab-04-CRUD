import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dog from '../lib/models/Dog.js';


// CRUD
// C - create POST      INSERT
// R - read   GET       SELECT
// U - update PUT       UPDATE
// D - delete DELETE    DELETE


describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a dog via POST', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ name: 'spot', age: 5, weight: '20 lbs' });

    expect(res.body).toEqual({
      id: '1',
      name: 'spot',
      age: 5,
      weight: '20 lbs',
    });
  });



  it('finds a dog by id via GET', async () => {
    const dog = await Dog.insert({
      name: 'rover',
      age: 10,
      weight: '50 lbs',
    });

    const res = await request(app).get(`/api/v1/dogs/${dog.id}`);

    expect(res.body).toEqual(dog);
  });

  it('finds all dogs via GET', async () => {

    const poodle = await Dog.insert({
      name: 'fluffy',
      age: 5,
      weight: 2,
    });

    const pitbull = await Dog.insert({
      name: 'max',
      age: 6,
      weight: 25,
    });

    const frenchy = await Dog.insert({
      name: 'blanco',
      age: 4,
      weight: 15,
    });

    const res = await request(app).get('/api/v1/dogs');

    expect(res.body).toEqual([poodle, pitbull, frenchy]);

  });

  it('deletes byeByeDoggie', async () => {
    const byeByeDoggie = await Dog.insert({
      name: 'ghostPup',
      age: 5,
      weight: 15,
    });


    const res = await request(app).delete(`/api/v1/dogs/${byeByeDoggie.id}`);

    expect(res.body).toEqual(byeByeDoggie);
    console.log(byeByeDoggie);

  });



});
