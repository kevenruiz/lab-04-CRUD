import { Router } from 'express';
import Vegetable from '../models/Vegetables.js';

export default Router()
  .post('/api/v1/vegetables', async (req, res) => {
    try {
      const vegetable = await Vegetable.insert(req.body);
      res.send(vegetable);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }

  })
  .get('/api/v1/vegetables/:id', async (req, res) => {
    try {
      const vegetable = await Vegetable.findById(req.params.id);
      res.send(vegetable);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });


