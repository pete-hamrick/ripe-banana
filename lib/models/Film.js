const pool = require('../utils/pool.js');

module.exports = class Film {
  constructor(row) {
    this.filmId = row.film_id;
    this.title = row.title;
    this.released = row.released;
    this.studioId = row.studio_id;
  }
  static async getAll() {
    const { rows } = await pool.query(
      'SELECT films.film_id, films.title, films.released, studios.studio_id, studios.name FROM films INNER JOIN studios ON films.studio_id = studios.studio_id'
    );
    return rows.map((row) => {
      return {
        filmId: row.film_id,
        title: row.title,
        released: row.released,
        studio: { studioId: row.studio_id, name: row.name },
      };
    });
  }
  static async getById(id) {
    const filmResult = await pool.query(
      `SELECT films.title, films.released, studios.studio_id, studios.name
      FROM films
      INNER JOIN studios
      ON films.studio_id = studios.studio_id
      WHERE films.film_id = ($1);`,
      [id]
    );
    const castResult = await pool.query(
      `SELECT actors.actor_id, actors.name
      FROM actors
      INNER JOIN film_actor
      ON actors.actor_id = film_actor.actor_id
      WHERE film_actor.film_id = ($1);`,
      [id]
    );
    const reviewsResult = await pool.query(
      `SELECT reviews.review_id, reviews.rating, reviews.review, reviewers.reviewer_id, reviewers.name
      FROM reviews
      INNER JOIN reviewers
      ON reviewers.reviewer_id = reviews.reviewer_id
      WHERE reviews.film_id = ($1);`,
      [id]
    );
    const film = filmResult.rows[0];
    const cast = castResult.rows;
    const reviews = reviewsResult.rows;

    return {
      title: film.title,
      released: film.released,
      studio: { studioId: film.studio_id, name: film.name },
      cast: cast.map((actor) => {
        return { actorId: actor.actor_id, name: actor.name };
      }),
      reviews: reviews.map((review) => {
        return {
          reviewId: review.review_id,
          rating: review.rating,
          review: review.review,
          reviewer: { reviewerId: review.reviewer_id, name: review.name },
        };
      }),
    };
  }
  static async insert({ title, released, studioId }) {
    const { rows } = await pool.query(
      'INSERT INTO films (title, released, studio_id) VALUES ($1, $2, $3) RETURNING *', 
      [title, released, studioId]
    );
    return new Film(rows[0]);
  }
};
