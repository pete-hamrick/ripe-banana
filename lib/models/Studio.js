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
};
