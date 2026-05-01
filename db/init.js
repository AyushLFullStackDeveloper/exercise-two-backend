const fs = require('fs');
const path = require('path');
const db = require('../config/db');

async function initDb() {
  try {
    console.log('--- DATABASE INITIALIZATION CHECK ---');
    
    // Check if the users table exists
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);

    const tableExists = tableCheck.rows[0].exists;

    if (tableExists) {
      console.log('Database already initialized. Skipping seeding.');
      return;
    }

    console.log('Database is empty. Starting self-seeding process...');

    // Read schema and seeds
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    const seedsSql = fs.readFileSync(path.join(__dirname, 'seeds.sql'), 'utf8');

    // Run schema
    console.log('Executing schema.sql...');
    await db.query(schemaSql);
    console.log('Schema created successfully.');

    // Run seeds
    console.log('Executing seeds.sql...');
    await db.query(seedsSql);
    console.log('Seeds inserted successfully.');

    console.log('--- DATABASE INITIALIZATION COMPLETED ---');
  } catch (error) {
    console.error('DATABASE INITIALIZATION FAILED:', error.message);
    // Don't throw error here, so the server can still start even if init fails
  }
}

module.exports = initDb;
