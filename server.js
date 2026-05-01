/**
 * @file server.js
 * @description Entry point for the backend server. Initializes the database connection before starting Express.
 */
const app = require('./app');
const initDb = require('./db/init');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

// Initialize Database then Start Server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
