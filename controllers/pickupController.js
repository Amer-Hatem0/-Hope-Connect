
const db = require('../config/db.config');



exports.schedulePickup = (req, res) => {
  const { donor_id, donation_id, pickup_time } = req.body;

  const sql = `INSERT INTO pickup_requests (donor_id, donation_id, pickup_time) VALUES (?, ?, ?)`;
  db.query(sql, [donor_id, donation_id, pickup_time], (err, result) => {
    if (err) return res.status(500).json({ error: "Scheduling failed" });
    res.json({ message: "Pickup scheduled", id: result.insertId });
  });
};
