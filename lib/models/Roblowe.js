import pool from '../utils/pool.js';

class Roblowe {
  id;
  how;
  many;
  times;

  constructor(row) {
    this.id = row.id;
    this.how = row.how;
    this.many = row.many;
    this.times = row.times;
  }

  static async insert({ how, many, times }) {
    const { rows } = await pool.query(`
    INSERT INTO roblowes (how, many, times)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [how, many, times]
    );
    return new Roblowe(rows[0]);
  }
}
export default Roblowe;
