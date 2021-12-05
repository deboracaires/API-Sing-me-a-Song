import connection from '../database/database.js';

async function selectByLink(link) {
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

async function selectById(id) {
  const result = await connection.query(`
        SELECT * FROM recommendations WHERE id = $1
    `, [id]);

  if (result.rowCount === 0) {
    return false;
  }
  return result.rows[0];
}

async function increaseScore(id) {
  const recommendation = await selectById(id);
  const score = Number(recommendation.score) + 1;
  const result = await connection.query(`
    UPDATE recommendations SET "score" = $2 WHERE id = $1 RETURNING *
  `, [id, score]);

  return result.rows[0];
}

async function decreaseScore(id, score) {
  const result = await connection.query(`
    UPDATE recommendations SET "score" = $2 WHERE id = $1 RETURNING *
  `, [id, score]);
  return result.rows[0];
}

async function deleteRecommendation(id) {
  await connection.query(`
    DELETE FROM recommendations WHERE id = $1 
  `, [id]);
  return true;
}

async function selectHighScore() {
  const result = await connection.query(`
    SELECT * FROM recommendations WHERE score > 10 ORDER BY id ASC
  `);
  return result.rows;
}

async function selectLowScore() {
  const result = await connection.query(`
    SELECT * FROM recommendations WHERE score <= 10 ORDER BY id ASC
  `);
  return result.rows;
}

async function selectTopAmount(amount) {
  const result = await connection.query(`
    SELECT * FROM recommendations ORDER BY score DESC LIMIT ${amount}
  `);
  return result.rows;
}
export {
  selectByLink,
  create,
  selectById,
  increaseScore,
  decreaseScore,
  deleteRecommendation,
  selectHighScore,
  selectLowScore,
  selectTopAmount,
};
