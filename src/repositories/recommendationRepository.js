import connection from '../database/database.js';

async function select(link) {
  const result = await connection.query(`
        SELECT * FROM recommendations WHERE "youtubeLink" = $1
    `, [link]);

  if (result.rowCount === 0) {
    return false;
  }
  return result.rows;
}

async function create(name, link) {
  const result = await connection.query(`
        INSERT INTO recommendations ("name", "youtubeLink", "score") VALUES ($1, $2, $3) RETURNING *
    `, [name, link, 0]);

  return result.rows;
}

export {
  select,
  create,
};
