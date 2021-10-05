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
          { studioId: expect.any(String), name: expect.any(String) },
          { studioId: expect.any(String), name: expect.any(String) },
          { studioId: expect.any(String), name: expect.any(String) },
        ]);
      });
  });

  it('returns all actors using the GET route /actors', () => {
    return request(app)
      .get('/actors')
      .then((response) => {
        expect(response.body).toEqual(expect.arrayContaining([{ actorId: expect.any(String), name: expect.any(String)}]));
        expect(response.body.length).toEqual(100);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
