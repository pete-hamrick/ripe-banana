const pool = require('../utils/pool.js');

module.exports = class Film {
  constructor(row){
    this.filmId = row.film_id;
    this.title = row.title;
    this.released = row.released;
    this.studioId = row.studio_id;
  }
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT films.film_id, films.title, films.released, studios.studio_id, studios.name FROM films INNER JOIN studios ON films.studio_id = studios.studio_id'
    );
    return rows.map(row => {
      return { filmId: row.film_id, title: row.title, released: row.released, studio: { studioId: row.studio_id, name: row.name } };
    });
  }
};
