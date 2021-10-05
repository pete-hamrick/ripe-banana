const pool = require('../utils/pool.js');

module.exports = class Reviewer {
    constructor(row) {
        this.reviewerId = row.reviewer_id,
        this.name = row.name,
        this.company = row.company,
    }

    static async getAll() {
        const {rows} = await pool.query('SELECT * FROM reviewers;')
        return rows.map((row) => new Reviewer(row));
    }
}