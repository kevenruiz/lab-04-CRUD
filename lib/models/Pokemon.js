import pool from '../utils/pool.js';

class Pokemon {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }

  static async insert({ name, type }) {
    const { rows } = await pool.query(`
    INSERT INTO pokemon (name, type)
    VALUES ($1, $2)
    RETURNING id, name, type;
    `, [name, type]
    );
    return new Pokemon(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM pokemon
    WHERE id = $1
    `, [id]);
    if (!rows[0]) return null;
    return new Pokemon(rows[0]);


  }


}
export default Pokemon;