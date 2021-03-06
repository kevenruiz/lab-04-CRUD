import { Router } from 'express';
import Pokemon from '../models/Pokemon.js';

export default Router()
  .post('/api/v1/pokemon', async (req, res) => {
    try {
      const pokemon = await Pokemon.insert(req.body);
      res.send(pokemon);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/pokemon/:id', async (req, res) => {
    try {
      const pokemon = await Pokemon.findById(req.params.id);
      res.send(pokemon);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/pokemon', async (req, res) => {
    try {
      const pokemon = await Pokemon.findAll();
      res.send(pokemon);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/pokemon/:id', async (req, res) => {
    try {
      const pokemon = await Pokemon.delete(req.params.id);
      res.send(pokemon);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .put('/api/v1/pokemon/:id', async (req, res) => {
    try {
      const pokemon = await Pokemon.put(req.body.name, req.body.type, req.params.id);
      res.send(pokemon);

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

