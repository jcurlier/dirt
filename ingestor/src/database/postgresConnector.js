// Libraries
const {Client} = require('pg');

/**
 * PostgreSQL Connector,
 * @class
 */
class DirtConnector {

  /**
   * Initialize the connector.
   * @method
   */
  async execute(sql, parameters = []) {
    const client = new Client({connectionString: process.env.DATABASE_URL});
    await client.connect();
    await client.query(sql, parameters);
    await client.end();
  }

}

module.exports = new DirtConnector();
