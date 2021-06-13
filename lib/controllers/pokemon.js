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
  });

