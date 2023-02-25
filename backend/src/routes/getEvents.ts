import * as express from 'express';
import { dbConnection } from '../db/dbConnect';
import { eventQueryBuilder } from '../db/helpers';

interface QueryParams {
  start: string;
  end: string;
}

function getEvents(
  request: express.Request<{}, {}, {}, QueryParams>,
  response: express.Response
): void {
  const { query } = request;
  const { start = '', end = '' } = query;

  const dbQuery = eventQueryBuilder(start, end);

  dbConnection.query(dbQuery, function (err, results) {
    if (err) throw new Error(err.message);
    // required for localhost testing - would need to be adapted with relevant CORS policy
    response.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    const data = results.map((obj: any) => {
      const rawData = Object.assign({}, obj);
      return JSON.parse(rawData.payload);
    });
    response.send(data);
  });
}

export function getEventRoutes(): express.Router {
  const router = express.Router();

  router.get('/events', getEvents);

  return router;
}
