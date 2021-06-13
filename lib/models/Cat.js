import pool from '../utils/pool.js';
import Dog from './Dog.js';

class Cat {
  id;
  name;
  color;
  age;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.age = row.age;
  }

  static async insert({ name, color, age }) {
    const { rows } = await pool.query(`
    INSERT INTO cats (name, color, age)
    VALUES ($1, $2, $3)
    RETURNING *`, [name, color, age]
    );
    return new Cat(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT *
      FROM cats
      WHERE id = $1
      `, [id]);
    if (!rows[0]) return null;

    return new Cat(rows[0]);

  }

  static async findAll() {
    const { rows } = await pool.query(`
    SELECT * from cats
    `);
    return rows.map(row => new Cat(row));
  }


}
export default Cat;
