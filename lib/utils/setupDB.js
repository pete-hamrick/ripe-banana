const { reviewer, studio } = require('./makeFakeData.js');
const pool = require('./pool.js');

module.exports = async () => {
  for (let i = 0; i < 5; i++) {
    const fakeReviewer = reviewer();
    await pool.query('INSERT INTO reviewers (name, company) VALUES ($1, $2);', [
      fakeReviewer.name,
      fakeReviewer.company,
    ]);
  }

  for (let i = 0; i < 3; i++) {
    const fakeStudio = studio();
    await pool.query(
      `
      INSERT INTO studios (
        name,
        city,
        state,
        country
      ) VALUES ($1, $2, $3, $4);`,
      [fakeStudio.name, fakeStudio.city, fakeStudio.state, fakeStudio.country]
    );
  }
};
