const pool = require('../config/db');

exports.getCircleMembers = async (req, res) => {
  const circleId = req.params.id;
  try {
    const query = `
      SELECT m.member_id, m.full_name, m.email, ms.joined_at, ms.status
      FROM members m
      JOIN memberships ms ON m.member_id = ms.member_id
      WHERE ms.circle_id = $1;
    `;
    const { rows } = await pool.query(query, [circleId]);
    res.json({ circle_id: parseInt(circleId), members: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCircleCycles = async (req, res) => {
  const circleId = req.params.id;
  try {
    const query = `
      SELECT cycle_id, cycle_number, start_date, end_date, status
      FROM cycles
      WHERE circle_id = $1
      ORDER BY cycle_number ASC;
    `;
    const { rows } = await pool.query(query, [circleId]);
    res.json({ circle_id: parseInt(circleId), cycles: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};