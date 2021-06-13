import pool from '../utils/pool.js';

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
}
export default Cat;
