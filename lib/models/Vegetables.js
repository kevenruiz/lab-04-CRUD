import pool from '../utils/pool.js';

class Vegetable {
  id;
  name;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
  }

  static async insert({ name, color }) {
    const { rows } = await pool.query(`INSERT INTO vegetables (name, color)
  VALUES ($1, $2)
  RETURNING *`, [name, color]);
    return new Vegetable(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM vegetables
    WHERE id = $1`, [id]);
    if (!rows[0]) return null;
    return new Vegetable(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM vegetables',
    );
    return rows.map(row => new Vegetable(row));
  }

}

export default Vegetable;
