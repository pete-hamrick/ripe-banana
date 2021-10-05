const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const setupDB = require('../lib/utils/setupDB.js');
describe('ripe-banana routes', () => {
  //add before all, run setupDB
  beforeAll(async () => {
    await setup(pool);
    await setupDB();
  });

  it('gets reviewer', () => {
    return request(app)
      .get('/reviewer')
      .then((res) => {
        expect(res.body).toEqual([
          {
            reviewerId: expect.any(String),
            name: expect.any(String),
            company: expect.any(String),
          },
          {
            reviewerId: expect.any(String),
            name: expect.any(String),
            company: expect.any(String),
          },
          {
            reviewerId: expect.any(String),
            name: expect.any(String),
            company: expect.any(String),
          },
          {
            reviewerId: expect.any(String),
            name: expect.any(String),
            company: expect.any(String),
          },
          {
            reviewerId: expect.any(String),
            name: expect.any(String),
            company: expect.any(String),
          },
        ]);
      });
  });

  it('gets the studios', () => {
    return request(app)
      .get('/studios')
      .then((res) => {
        expect(res.body).toEqual([
          { studio_id: expect.any(String), name: expect.any(String) },
          { studio_id: expect.any(String), name: expect.any(String) },
          { studio_id: expect.any(String), name: expect.any(String) },
        ]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
