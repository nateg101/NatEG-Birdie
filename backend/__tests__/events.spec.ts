import app from '../src/application';
import * as request from 'supertest';

describe('events', () => {
  it('returns a 200 status and the correct response body', async () => {
    await request(app)
      .get('/events')
      .expect(200)
      .expect((res) => expect(res.body).toHaveLength(50));
  });

  it('returns an empty array when start date is too recent', async () => {
    await request(app)
      .get('/events?start=2023-01-01')
      .expect(200)
      .expect((res) => expect(res.body).toHaveLength(0));
  });
});
