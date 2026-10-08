const pool = require('../../config/db');

exports.createCircle = async (req, res) => {
  const { name, contribution_amount, cycle_frequency, max_members } = req.body;
  try {
    const query = `
      INSERT INTO circles (name, contribution_amount, cycle_frequency, max_members)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, contribution_amount, cycle_frequency, max_members]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCircles = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM circles ORDER BY circle_id ASC;');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCircleById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM circles WHERE circle_id = $1;', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Circle not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCircleMembers = async (req, res) => {
  const circleId = req.params.id;
  try {
    const query = `
      SELECT m.member_id, m.full_name, m.email, ms.payout_position, ms.joined_at, ms.status
      FROM members m
      JOIN memberships ms ON m.member_id = ms.member_id
      WHERE ms.circle_id = $1
      ORDER BY ms.payout_position ASC;
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

exports.updateCircle = async (req, res) => {
  const { id } = req.params;
  const { name, max_members } = req.body;
  try {
    const query = `
      UPDATE circles
      SET name = COALESCE($1, name),
          max_members = COALESCE($2, max_members)
      WHERE circle_id = $3
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, max_members, id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Circle not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCircle = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM circles WHERE circle_id = $1 RETURNING *;', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Circle not found' });
    res.json({ message: 'Circle deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
