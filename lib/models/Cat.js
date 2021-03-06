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

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM cats
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return new Cat(rows[0]);
  }
  static async put(name, color, age, id) {
    const { rows } = await pool.query(
      `UPDATE cats
      SET name = $1,
          color = $2,
          age = $3
      WHERE id = $4
      RETURNING *
      `,
      [name, color, age, id]
    );
    return new Cat(rows[0]);
  }



}
export default Cat;
