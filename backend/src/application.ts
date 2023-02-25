import * as express from 'express';
import { getRoutes } from './controllers/events';

const app = express();

app.use(getRoutes());

export default app;
