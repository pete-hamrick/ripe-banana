const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('ripe-banana routes', () => {
  beforeEach(() => {
    return setup(pool);
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

  afterAll(() => {
    pool.end();
  });
});
