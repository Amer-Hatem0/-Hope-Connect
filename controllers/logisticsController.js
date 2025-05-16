const db = require('../config/db.config');
const logger = require('../utils/logger');

 
exports.updateTrackingStatus = (req, res) => {
  const { donationId } = req.params;
  const { status } = req.body;

  const sql = `UPDATE logistics_tracking SET status = ? WHERE donation_id = ?`;
  db.query(sql, [status, donationId], (err) => {
    if (err) return res.status(500).json({ error: "Failed to update tracking" });
    res.json({ message: "Tracking status updated" });
  });
};

exports.getTrackingStatus = (req, res) => {
  const { donationId } = req.params;

  const sql = `SELECT * FROM logistics_tracking WHERE donation_id = ?`;
  db.query(sql, [donationId], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to fetch tracking" });
    res.json(result[0]);
  });
};
