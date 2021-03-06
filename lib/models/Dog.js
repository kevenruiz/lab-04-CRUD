import pool from '../utils/pool.js';

class Dog {
  id;
  name;
  age;
  weight;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.weight = row.weight;
  }

  //static method
  //instance method
  static async insert({ name, age, weight }) {
    const { rows } = await pool.query(`
    INSERT INTO dogs (name, age, weight)
    VALUES ($1, $2, $3)
    RETURNING *`, [name, age, weight]
    );
    return new Dog(rows[0]);

  }

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT *
      FROM dogs
      WHERE id = $1
      `, [id]);
    if (!rows[0]) return null;

    return new Dog(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM dogs',
    );
    return rows.map(row => new Dog(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM dogs
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return new Dog(rows[0]);
  }

  static async put(name, age, weight, id) {
    const { rows } = await pool.query(
      `UPDATE dogs
      SET name = $1,
          age = $2,
          weight = $3
      WHERE id = $4
      RETURNING *
      `,
      [name, age, weight, id]
    );
    return new Dog(rows[0]);
  }




}

export default Dog;
