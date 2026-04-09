const { Pool } = require('pg');
const connectionString = 'postgres://postgres_gg7j_user:VL2WuBk0W5IgPpnHpKfEOF1FXQ9ouJJn@dpg-d78eos450q8c73esbpo0-a.oregon-postgres.render.com:5432/postgres_gg7j?ssl=true';

const pool = new Pool({
  connectionString: connectionString,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('CONNECTION ERROR:', err.message);
  } else {
    console.log('CONNECTED VIA STRING');
    console.log('TIME:', res.rows[0].now);
  }
  pool.end();
});
