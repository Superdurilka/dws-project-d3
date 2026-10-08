const pool = require('../../config/db');

exports.createMember = async (req, res) => {
  const { full_name, email, phone } = req.body;
  try {
    const query = `
      INSERT INTO members (full_name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING member_id, full_name, email, phone, created_at, status;
    `;
    const { rows } = await pool.query(query, [full_name, email, phone]);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT member_id, full_name, email, phone, status, created_at FROM members ORDER BY member_id ASC;');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT member_id, full_name, email, phone, status, created_at FROM members WHERE member_id = $1;', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Member not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMember = async (req, res) => {
  const { id } = req.params;
  const { full_name, phone, status } = req.body;
  try {
    const query = `
      UPDATE members
      SET full_name = COALESCE($1, full_name),
          phone = COALESCE($2, phone),
          status = COALESCE($3, status)
      WHERE member_id = $4
      RETURNING member_id, full_name, email, phone, status;
    `;
    const { rows } = await pool.query(query, [full_name, phone, status, id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Member not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `UPDATE members SET status = 'closed' WHERE member_id = $1 RETURNING member_id, status;`;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Member not found' });
    res.json({ message: 'Member deactivated successfully', member: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
