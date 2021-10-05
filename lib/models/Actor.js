const pool = require('../utils/pool.js');

module.exports = class Actor {
  constructor(row){
    this.actorId = row.actor_id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
  }
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT actor_id, name FROM actors',
    );
    return rows.map(row => {
      return new Actor(row);
    });
  }
};
