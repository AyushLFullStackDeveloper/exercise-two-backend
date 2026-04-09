const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('CONNECTION ERROR:', err.message);
  } else {
    console.log('CONNECTED TO:', process.env.DB_HOST);
    console.log('TIME FROM DB:', res.rows[0].now);
  }
  pool.end();
});
