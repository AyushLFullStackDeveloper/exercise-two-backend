const app = require('./app');
const initDb = require('./db/init');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Initialize Database then Start Server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
