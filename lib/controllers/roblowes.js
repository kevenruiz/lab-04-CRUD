import { Router } from 'express';
import Roblowe from '../models/Roblowe.js';


export default Router()
  .post('/api/v1/roblowes', async (req, res) => {
    try {
      const roblowe = await Roblowe.insert(req.body);
      res.send(roblowe);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/roblowes/:id', async (req, res) => {
    try {
      const roblowe = await Roblowe.findById(req.params.id);
      //update req.body(whatever you are changing) and req.params.id
      res.send(roblowe);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/roblowes', async (req, res) => {
    try {
      const roblowe = await Roblowe.findAll();
      res.send(roblowe);
    }
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/api/v1/roblowes/:id', async (req, res) => {
    try {
      const roblowe = await Roblowe.delete(req.params.id);
      res.send(roblowe);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .put('/api/v1/roblowes/:id', async (req, res) => {
    try {
      const roblowe = await Roblowe.put(req.body.how, req.body.many, req.body.times, req.params.id);
      res.send(roblowe);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });


