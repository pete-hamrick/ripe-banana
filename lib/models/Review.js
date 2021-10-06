const pool = require('../utils/pool.js');

module.exports = class Review {
  constructor(row) {
    this.reviewId = row.review_id;
    this.reviewerId = row.reviewer_id;
    this.rating = row.rating;
    this.review = row.review;
    this.filmId = row.film_id;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT review_id, rating, review, films.film_id, films.title
      FROM reviews INNER JOIN films
      ON reviews.film_id=films.film_id
      ORDER BY reviews.rating DESC
      LIMIT 100`
    );
    return rows.map((row) => {
      return {
        reviewId: row.review_id,
        rating: row.rating,
        review: row.review,
        film: {
          filmId: row.film_id,
          title: row.title,
        },
      };
    });
  }

  static async deleteReview(id) {
    const { rows } = await pool.query(
      'DELETE FROM reviews WHERE review_id=$1 RETURNING *',
      [id]
    );
    return new Review(rows[0]);
  }
};
