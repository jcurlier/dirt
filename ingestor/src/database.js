// Libraries
const {Client} = require('pg');

async function execute(sql, parameters = []) {
  const client = new Client({connectionString: process.env.DATABASE_URL});
  await client.connect();
  await client.query(sql, parameters);
  await client.end();
}

module.exports = {
  execute,
};
