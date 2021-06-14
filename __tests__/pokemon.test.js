import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Pokemon from '../lib/models/Pokemon.js';

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
      });
    expect(res.body).toEqual({
      id: '1',
      name: 'pikachu',
      type: 'electric',
    });
  });
  it('find a pokemon by id via GET', async () => {
    const pokemon = await Pokemon.insert({
      name: 'pikachu', type: 'electric', isEvolved: false
    });
    const res = await request(app).get(`/api/v1/pokemon/${pokemon.id}`);

    expect(res.body).toEqual(pokemon);
  });

  it('finds all pokemon via GET', async () => {

    const raichu = await Pokemon.insert({
      name: 'Raichu',
      type: 'Electric'
    });
    const snorlax = await Pokemon.insert({
      name: 'Snorlax',
      type: 'Bear Pokemon'
    });
    const res = await request(app).get('/api/v1/pokemon');
    expect(res.body).toEqual([raichu, snorlax]);
  });

  it('deletes pokemon 1', async () => {
    const pokemon1 = await Pokemon.insert({
      name: 'deletethispokemon',
      type: 'electric',
    });

    const res = await request(app).delete(`/api/v1/pokemon/${pokemon1.id}`);
    expect(res.body).toEqual(pokemon1);
  });

  it('update a pokemon', async () => {
    const poke1 = await Pokemon.insert({
      name: 'poke1',
      type: 'Whatever',

    });

    const poke2 = await Pokemon.insert({
      name: 'poke2',
      type: 'also whatever',
    });

    const res = await (await request(app).put(`/api/v1/pokemon/${poke1.id}`)).send(poke2);
    expect(res.body).toEqual(poke2);


  });
});
