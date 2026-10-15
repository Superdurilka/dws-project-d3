const express = require('express');
const cors = require('cors');

const memberRoutes = require('./src/routes/memberRoutes');
const circleRoutes = require('./src/routes/circleRoutes');
const contributionRoutes = require('./src/routes/contributionRoutes');
const payoutRoutes = require('./src/routes/payoutRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/members', memberRoutes);
app.use('/api/circles', circleRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/payouts', payoutRoutes);

app.get('/api/dashboard/overview', async (req, res) => {
  res.json({
    circle: {
      id: 1,
      name: "Alpha Savings Group",
      contribution_amount: 500.00,
      cycle_frequency: "monthly",
      max_members: 10,
      current_cycle: 3
    },
    contributions: [
      { member_id: 1, full_name: "Alice Smith", amount: 500.00, status: "paid" },
      { member_id: 2, full_name: "Bob Johnson", amount: 500.00, status: "paid" },
      { member_id: 3, full_name: "Charlie Brown", amount: 0.00, status: "pending" },
      { member_id: 4, full_name: "Diana Prince", amount: 500.00, status: "paid" }
    ],
    next_payout: {
      cycle_number: 3,
      recipient_id: 3,
      recipient_name: "Charlie Brown",
      total_pot: 5000.00,
      disbursement_date: "2026-10-31"
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
