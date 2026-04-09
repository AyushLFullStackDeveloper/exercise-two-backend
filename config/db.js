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

console.log('--- DATABASE CONFIG ---');
console.log('Host:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
console.log('-----------------------');

module.exports = pool;
