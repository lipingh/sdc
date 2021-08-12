const { Pool } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'sdc',
  password: 'password',
  port: 5432,
});
module.exports = { pool };
