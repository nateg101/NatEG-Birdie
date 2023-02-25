import * as express from 'express';
import { getEventRoutes } from '../routes/getEvents';

function getRoutes(): express.Router {
  const router = express.Router();

  router.use("/", getEventRoutes());

  return router;
}

export { getRoutes };
