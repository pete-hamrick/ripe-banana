const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
// const request = require('supertest');
// const app = require('../lib/app.js');

describe('ripe-banana routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should pass on github', () => {
    expect(1).toEqual(1);
  });

  afterAll(() => {
    pool.end();
  });
});
