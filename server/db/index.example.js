const { Pool } = require('pg');

const pool = new Pool({
  user: 'user_name',
  host: 'localhost',
  database: 'your_db_name',
  password: 'password',
  port: 5432,
});
module.exports = { pool };
