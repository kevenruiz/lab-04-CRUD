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
  })
  .get('/api/v1/vegetables', async (req, res) => {
    try {
      const vegetable = await Vegetable.findAll();
      res.send(vegetable);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/vegetables/:id', async (req, res) => {
    try {
      const vegetable = await Vegetable.delete(req.params.id);
      res.send(vegetable);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .put('/api/v1/vegetables/:id', async (req, res) => {
    try {
      const vegetable = await Vegetable.put(req.body.name, req.body.color, req.params.id);
      res.send(vegetable);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });


