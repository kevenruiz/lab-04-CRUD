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
  });

