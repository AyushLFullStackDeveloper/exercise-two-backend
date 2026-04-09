const { Pool } = require('pg');

async function test(pw) {
  const pool = new Pool({
    host: 'dpg-d78eos450q8c73esbpo0-a.oregon-postgres.render.com',
    user: 'postgres_gg7j_user',
    password: pw,
    database: 'postgres_gg7j',
    ssl: { rejectUnauthorized: false }
  });
  try {
    await pool.query('SELECT 1');
    console.log('SUCCESS WITH:', pw);
  } catch (e) {
    console.log('FAILED WITH:', pw, '-', e.message);
  } finally {
    await pool.end();
  }
}

async function run() {
  await test('VL2WuBk0W5IgPpnHpKfEOF1FXQ9ouJJn'); // Current
  await test('Vl2WuBk0W5IgPpnHpKfEOF1FXQ9ouJJn'); // lowercase L
  await test('VL2WuBk0W5lgPpnHpKfEOF1FXQ9ouJJn'); // lowercase L at index 10
  await test('Vl2WuBk0W5lgPpnHpKfEOF1FXQ9ouJJn'); // both
}

run();
