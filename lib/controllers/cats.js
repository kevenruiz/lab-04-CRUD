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
  });
