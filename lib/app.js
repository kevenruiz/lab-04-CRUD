import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import dogController from '../lib/controllers/dogs.js';
import catController from '../lib/controllers/cats.js';
import pokemonController from '../lib/controllers/pokemon.js';
import vegetableControllers from '../lib/controllers/vegetables.js';
import robLowesController from '../lib/controllers/roblowes.js';

const app = express();

app.use(express.json());

app.use(dogController);
app.use(catController);
app.use(pokemonController);
app.use(vegetableControllers);
app.use(robLowesController);

//10 ten I assume with be the repeat for the rest of the controllers

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
