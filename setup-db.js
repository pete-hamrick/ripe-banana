const pool = require('./lib/utils/pool.js');
const setup = require('./data/setup.js');
const setupDb = require('./lib/utils/setupDB.js');

setup(pool);
setupDb();
