const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // ✅ ADD THIS LINE

const authRoutes = require('./routes/auth.routes');
const tenantRoutes = require('./routes/tenant.routes');
const instituteRoutes = require('./routes/institute.routes');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const mappingRoutes = require('./routes/mapping.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // ✅ NOW WORKS

// Routes
app.use('/auth', authRoutes);
app.use('/tenants', tenantRoutes);
app.use('/institutes', instituteRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/mappings', mappingRoutes);
app.use('/dashboard', dashboardRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'SchoolCoreOS API is online' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: err.message || err,
    stack: err.stack
  });
});

module.exports = app;