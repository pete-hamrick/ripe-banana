const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const setupDB = require('../lib/utils/setupDB.js');
describe('ripe-banana routes', () => {
  beforeAll(async () => {
    await setup(pool);
    await setupDB();
  }, 10000);

  it('gets reviewer', () => {
    return request(app)
      .get('/reviewer')
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            {
              reviewerId: expect.any(String),
              name: expect.any(String),
              company: expect.any(String),
            },
          ])
        );
        expect(res.body.length).toEqual(20);
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
        expect(response.body).toEqual(
          expect.arrayContaining([
            { actorId: expect.any(String), name: expect.any(String) },
          ])
        );
        expect(response.body.length).toEqual(516);
      });
  });

  it('returns film id, title, release date, and studio id, name with GET /films route', () => {
    return request(app)
      .get('/films')
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            {
              filmId: expect.any(String),
              title: expect.any(String),
              released: expect.any(Number),
              studio: {
                studioId: expect.any(String),
                name: expect.any(String),
              },
            },
          ])
        );
        expect(response.body.length).toEqual(199);
      });
  });

  it('should return the 100 highest reviews from the database', async () => {
    const res = await request(app).get('/reviews');
    expect(res.body).toEqual(
      expect.arrayContaining([
        {
          reviewId: expect.any(String),
          rating: expect.any(Number),
          review: expect.any(String),
          film: { filmId: expect.any(String), title: expect.any(String) },
        },
      ])
    );
    expect(res.body.length).toEqual(100);
  });

  it('should return a studio by id', async () => {
    const res = await request(app).get('/studios/2');
    expect(res.body).toEqual({
      studioId: expect.any(String),
      name: expect.any(String),
      city: expect.any(String),
      state: expect.any(String),
      country: expect.any(String),
      films: expect.arrayContaining([
        { filmId: expect.any(String), title: expect.any(String) },
      ]),
    });
  });

  it('should return a film object by its /:id using a get route', async () => {
    const res = await request(app).get('/films/108');
    expect(res.body).toEqual({
      title: expect.any(String),
      released: expect.any(Number),
      studio: { studioId: expect.any(String), name: expect.any(String) },
      cast: expect.arrayContaining([
        { actorId: expect.any(String), name: expect.any(String) },
      ]),
      reviews: expect.arrayContaining([
        {
          reviewId: expect.any(String),
          rating: expect.any(Number),
          review: expect.any(String),
          reviewer: {
            reviewerId: expect.any(String),
            name: expect.any(String),
          },
        },
      ]),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
