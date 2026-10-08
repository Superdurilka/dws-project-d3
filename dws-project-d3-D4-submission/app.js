const express = require('express');
const cors = require('cors');
const apiLimiter = require('./src/middleware/rateLimiter');

const memberRoutes = require('./src/routes/memberRoutes');
const circleRoutes = require('./src/routes/circleRoutes');
const contributionRoutes = require('./src/routes/contributionRoutes');
const payoutRoutes = require('./src/routes/payoutRoutes');

const app = express();

// Security Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter);

// Route Mounting
app.use('/api/members', memberRoutes);
app.use('/api/circles', circleRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/payouts', payoutRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'ROSCA Financial Management System API - Deliverable 4 (Track A)' });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
