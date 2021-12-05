import connection from '../../src/database/database.js';

export async function clearDatabase() {
  await connection.query('DELETE FROM "recommendations"');
}

export async function closeConnection() {
  await connection.end();
}
