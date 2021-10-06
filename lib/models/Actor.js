const pool = require('../utils/pool.js');

module.exports = class Actor {
  constructor(row) {
    this.actorId = row.actor_id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT actor_id, name FROM actors');
    return rows.map((row) => {
      return new Actor(row);
    });
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT name, dob, pob, 
      ARRAY_AGG(films.film_id|| ', ' || films.title || ', ' || films.released) AS films
      FROM actors LEFT JOIN film_actor
      ON actors.actor_id=film_actor.actor_id
      LEFT JOIN films
      ON film_actor.film_id=films.film_id
      WHERE actors.actor_id=$1
      GROUP BY name, dob, pob`,
      [id]
    );
    let films;
    const actor = { name: rows[0].name, dob: rows[0].dob, pob: rows[0].pob };
    // Check to make sure actor has been in films
    if (rows[0].films[0]) {
      films = rows[0].films.map((film) => {
        const splitFilm = film.split(', ');
        return {
          filmId: splitFilm[0],
          title: splitFilm[1],
          released: splitFilm[2],
        };
      });
    } else {
      films = [null];
    }
    return { ...actor, films };
  }
};
