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

  it(' finds all cats via GET', async () => {

    const entry1 = await Cat.insert({
      name: 'hello1',
      color: '1',
      age: 1,
    });
    const entry2 = await Cat.insert({
      name: 'hello2',
      color: '2',
      age: 2,
    });
    const entry3 = await Cat.insert({
      name: 'hello3',
      color: '3',
      age: 3,
    });

    const res = await request(app).get('/api/v1/cats');
    expect(res.body).toEqual([entry1, entry2, entry3]);
  });

  it('deletes cat1', async () => {
    const cat1 = await Cat.insert({
      name: 'ghostkitty',
      color: 'transparent',
      age: 15,
    });


    const res = await request(app).delete(`/api/v1/cats/${cat1.id}`);

    expect(res.body).toEqual(cat1);


  });

  it('it updates a cat', async () => {
    const cat1 = ({
      name: 'I am kitty number one',
      color: 'I want to be green today',
      age: 25,
    });
    const cat2 = ({
      name: 'just kidding I am now cat numero 2',
      color: 'I am feeling blue actually',
      age: 26,
    });

    const res = await (await request(app).put(`/api/v1/cats/${cat1.id}`)).send(cat2);
    expect(res.body).toEqual(cat1(cat2));

  });





});
