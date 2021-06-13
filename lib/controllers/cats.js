import { Router } from 'express';
import Cat from '../models/Cat.js';

export default Router()
  .post('/api/v1/cats', async (req, res) => {
    try {
      const cat = await Cat.insert(req.body);
      res.send(cat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/cats/:id', async (req, res) => {
    try {
      const cat = await Cat.findById(req.params.id);
      res.send(cat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/cats', async (req, res) => {
    try {
      const cat = await Cat.findAll();
      res.send(cat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/cats/:id', async (req, res) => {
    try {
      const cat = await Cat.delete(req.params.id);
      res.send(cat);
    } catch (err) {
      res.send(500).send({ error: err.message });
    }
  })
  .put('/api/v1/cats/:id', async (req, res) => {
    try {
      const cat = await Cat.put(req.body.name, req.body.color, req.body.age, req.params.id);
      res.send(cat);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

