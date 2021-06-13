import pool from '../utils/pool.js';

class Pokemon {
  id;
  name;
  type;
  isEvolved;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.isEvolved = row.isEvolved;
  }

  static async insert({ name, type, isEvolved }) {
    const { rows } = await pool.query(`
    INSERT INTO pokemon (name, type, is_evolved)
    VALUES ($1, $2, $3)
    RETURNING id, name, type, is_evolved as "isEvolved";
    `, [name, type, isEvolved]
    );
    return new Pokemon(rows[0]);
  }


}
export default Pokemon;
