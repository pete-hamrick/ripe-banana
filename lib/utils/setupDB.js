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

  for (let i = 0; i < 516; i++) {
    const fakeActor = actor();

    await pool.query(
      `
      INSERT INTO actors (name, dob, pob) VALUES ($1, $2, $3);`,
      [fakeActor.name, fakeActor.dob, fakeActor.pob]
    );
  }

  for (let i = 0; i < 199; i++) {
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

  //looping through all our filmIds
  for (let i = 1; i < 199; i++) {
    // actor ids to assign to a film
    let actorIds = [];
    // for loop that will run 0-20 times inserting that many actors into a film
    for (let j = 0; j < Math.ceil(Math.random() * 20); j++) {
      // gets a random actor id
      const id = Math.ceil(Math.random() * 500);
      // pushing that random actor into our actor array
      actorIds.push(id);
    }
    // gets rid of duplicates
    actorIds = [...new Set(actorIds)];
    // loops through our actorIds array and inserts them into the DB
    for (let x = 0; x < actorIds.length; x++) {
      await pool.query(
        'INSERT INTO film_actor (actor_id, film_id) VALUES ($1, $2);',
        [actorIds[x], i]
      );
    }
  }
};
