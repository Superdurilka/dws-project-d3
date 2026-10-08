const pool = require('../../config/db');

exports.createPayout = async (req, res) => {
  const { cycle_id, recipient_id, total_amount } = req.body;
  try {
    const query = `
      INSERT INTO payouts (cycle_id, recipient_id, total_amount)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [cycle_id, recipient_id, total_amount]);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') { // UNIQUE constraint on cycle_id
      return res.status(409).json({ error: 'Payout already disbursed for this cycle' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getPayoutByCycle = async (req, res) => {
  const { cycleId } = req.params;
  try {
    const query = `
      SELECT p.payout_id, p.cycle_id, p.recipient_id, m.full_name AS recipient_name, p.total_amount, p.disbursed_at, p.status
      FROM payouts p
      JOIN members m ON p.recipient_id = m.member_id
      WHERE p.cycle_id = $1;
    `;
    const { rows } = await pool.query(query, [cycleId]);
    if (rows.length === 0) return res.status(404).json({ error: 'No payout found for this cycle' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
