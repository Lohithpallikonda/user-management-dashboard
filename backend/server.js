const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database.js');
const userRoutes = require('./routes/users.js');

const app = express();
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);

// Serve static files in production
if (NODE_ENV === 'production') {
  // Serve static files from React build
  const buildPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(buildPath));
  
  // Handle React routing - send all non-API requests to React app
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // Development root endpoint
  app.get('/', (req, res) => {
    res.json({ 
      message: 'User Management API is running!',
      environment: NODE_ENV,
      endpoints: {
        users: '/api/users',
        user_by_id: '/api/users/:id'
      }
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log(`CORS Origin: ${corsOptions.origin}`);
});