const db = require('../config/db.config');
const logger = require('../utils/logger');

 
exports.updateTrackingStatus = (req, res) => {
  const { donationId } = req.params;
  const { status } = req.body;

  const checkSql = `SELECT * FROM logistics_tracking WHERE donation_id = ?`;
  db.query(checkSql, [donationId], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to check tracking" });

    if (results.length > 0) {
     const updateSql = `UPDATE logistics_tracking SET status = ?, updated_at = NOW() WHERE donation_id = ?`;
      db.query(updateSql, [status, donationId], (err) => {
        if (err) return res.status(500).json({ error: "Failed to update tracking" });
        res.json({ message: "Tracking status updated" });
      });
    } else {
  
      const insertSql = `INSERT INTO logistics_tracking (donation_id, status, updated_at) VALUES (?, ?, NOW())`;
      db.query(insertSql, [donationId, status], (err) => {
        if (err) return res.status(500).json({ error: "Failed to insert tracking" });
        res.json({ message: "Tracking status created" });
      });
    }
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

 


exports.getAdminPickupDonations = (req, res) => {
  const sql = `
    SELECT 
      d.id, 
      d.amount, 
      dc.name AS category_name, 
      lt.status
    FROM donations d
    INNER JOIN pickup_requests p ON d.id = p.donation_id
    LEFT JOIN donation_categories dc ON d.category_id = dc.id
    LEFT JOIN logistics_tracking lt ON d.id = lt.donation_id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL error:", err);  
      return res.status(500).json({ error: "Error fetching donations with pickup" });
    }
    res.json(results);
  });
};
