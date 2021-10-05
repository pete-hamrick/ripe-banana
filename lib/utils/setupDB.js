const { reviewer, studio, actor, film, review } = require('./makeFakeData.js');
const pool = require('./pool.js');

module.exports = async () => {
  for (let i = 0; i < 20; i++) {
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

  for (let i = 0; i < 50; i++) {
    const fakeActor = actor();

    await pool.query(
      `
      INSERT INTO actors (name, dob, pob) VALUES ($1, $2, $3);`,
      [fakeActor.name, fakeActor.dob, fakeActor.pob]
    );
  }

  for (let i = 0; i < 200; i++) {
    const fakeFilm = film();

    await pool.query(
      `
      INSERT INTO films (title, released, studio_id) VALUES ($1, $2, $3);`,
      [fakeFilm.title, fakeFilm.released, fakeFilm.studioId]
    );
  }

  for (let i = 0; i < 443; i++) {
    const fakeReview = review();

    await pool.query(
      'INSERT INTO reviews (rating, reviewer_id, review, film_id) VALUES ($1, $2, $3, $4);',
      [
        fakeReview.rating,
        fakeReview.reviewerId,
        fakeReview.review,
        fakeReview.filmId,
      ]
    );
  }
};
