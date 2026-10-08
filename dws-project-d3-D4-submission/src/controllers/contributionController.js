const pool = require('../../config/db');

exports.createContribution = async (req, res) => {
  const { cycle_id, member_id, amount } = req.body;
  try {
    const query = `
      INSERT INTO contributions (cycle_id, member_id, amount)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [cycle_id, member_id, amount]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContributionsByCycle = async (req, res) => {
  const { cycleId } = req.params;
  try {
    const query = `
      SELECT c.contribution_id, c.cycle_id, c.member_id, m.full_name, c.amount, c.paid_at, c.status
      FROM contributions c
      JOIN members m ON c.member_id = m.member_id
      WHERE c.cycle_id = $1;
    `;
    const { rows } = await pool.query(query, [cycleId]);
    res.json({ cycle_id: parseInt(cycleId), contributions: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContributionsByMember = async (req, res) => {
  const { memberId } = req.params;
  try {
    const query = `
      SELECT c.contribution_id, c.cycle_id, c.amount, c.paid_at, c.status
      FROM contributions c
      WHERE c.member_id = $1
      ORDER BY c.paid_at DESC;
    `;
    const { rows } = await pool.query(query, [memberId]);
    res.json({ member_id: parseInt(memberId), contributions: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
