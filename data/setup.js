import { promises as fs } from 'fs';
import path from 'path';

export default (pool) => {
  return fs
    .readFile('C:/Users/keven/alchemy/career-track-backend/lab-04-CRUD/sql/setup.sql',
      {
        encoding: 'utf-8',
      }
    )
    .then((sql) => pool.query(sql));
};
