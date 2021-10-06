const pool = require('../utils/pool.js');

module.exports = class Reviewer {
  constructor(row) {
    this.reviewerId = row.reviewer_id;
    this.name = row.name;
    this.company = row.company;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM reviewers;');
    return rows.map((row) => new Reviewer(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT reviewers.reviewer_id, name, company,
        ARRAY_AGG(reviews.review_id||', '||rating ||', '||review) AS reviews
    FROM reviewers LEFT JOIN reviews
    ON reviewers.reviewer_id=reviews.reviewer_id
    WHERE reviewers.reviewer_id=$1
    GROUP BY reviewers.reviewer_id, name, company
    `,
      [id]
    );

    const films = await pool.query(
      `
    SELECT films.film_id, title, reviews.review_id
    FROM films
    INNER JOIN reviews
    ON films.film_id=reviews.film_id
    WHERE reviews.reviewer_id=$1
    ORDER BY reviews.review_id`,
      [id]
    );

    const reviewer = {
      reviewerId: rows[0].reviewer_id,
      name: rows[0].name,
      company: rows[0].company,
    };

    const reviewedFilms = films.rows.map((row) => {
      return { filmId: row.film_id, title: row.title };
    });

    const reviews = rows[0].reviews.map((review, i) => {
      const splitReview = review.split(', ');
      return {
        reviewId: splitReview[0],
        rating: splitReview[1],
        review: splitReview[2],
        film: reviewedFilms[i],
      };
    });

    return { ...reviewer, reviews };
  }

  static async updateById({ id, name, company }) {
    const { rows } = await pool.query(
      'UPDATE reviewers SET name=$1, company=$2 WHERE reviewer_id=$3 RETURNING *;',
      [name, company, id]
    );
    return new Reviewer(rows[0]);
  }
};
