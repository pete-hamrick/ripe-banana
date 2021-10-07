const pool = require('../utils/pool.js');

module.exports = class Studio {
  constructor(row) {
    this.studioId = row.studio_id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
    this.country = row.country;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT studio_id, name FROM studios;');
    return rows.map((row) => new Studio(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT
      studios.studio_id,
      name,
      city,
      state,
      country,
      ARRAY_AGG(films.film_id || ', ' || films.title) films
    FROM
      studios
    INNER JOIN films on studios.studio_id = films.studio_id
    WHERE studios.studio_id = $1
    GROUP BY studios.studio_id;
    `,
      [id]
    );
    const films = rows[0].films.map((it) => {
      const splitFilm = it.split(', ');
      return { filmId: splitFilm[0], title: splitFilm[1] };
    });
    const studio = {
      studioId: rows[0].studio_id,
      name: rows[0].name,
      city: rows[0].city,
      state: rows[0].state,
      country: rows[0].country,
    };
    return { ...studio, films };
  }
  
  static async insert({ name, city, state, country }){
    const { rows } = await pool.query(
      `INSERT INTO studios (
        name,
        city,
        state,
        country
      ) VALUES ($1, $2, $3, $4) RETURNING *`, [name, city, state, country]
    );
    return new Studio(rows[0]);
  }
};
