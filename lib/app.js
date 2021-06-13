import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dogController from '../lib/controllers/dogs.js';
import catController from '../lib/controllers/cats.js';

const app = express();

app.use(express.json());

app.use(dogController);
app.use(catController);

//10 ten I assume with be the repeat for the rest of the controllers

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
