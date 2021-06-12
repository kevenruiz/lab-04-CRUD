
import { Router } from 'express';
import Dog from '../models/Dog.js';



export default Router()
  .post('/api/v1/dogs', async (req, res) => {
    try {
      const dog = await Dog.insert(req.body);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/dogs/:id', async (req, res) => {
    try {
      const dog = await Dog.findById(req.params.id);
      //update req.body(whatever you are changing) and req.params.id
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/dogs', async (req, res) => {
    try {
      const dog = await Dog.findAll();
      res.send(dog);
    }
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/dogs/:id', async (req, res) => {
    try {
      const dog = await Dog.delete(req.params.id);
      res.send(dog);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });







