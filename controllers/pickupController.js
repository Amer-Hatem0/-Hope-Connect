
const db = require('../config/db.config');



exports.schedulePickup = (req, res) => {
  const { donor_id, donation_id, pickup_time } = req.body;

  const sql = `INSERT INTO pickup_requests (donor_id, donation_id, pickup_time) VALUES (?, ?, ?)`;
  db.query(sql, [donor_id, donation_id, pickup_time], (err, result) => {
    if (err) return res.status(500).json({ error: "Scheduling failed" });
    res.json({ message: "Pickup scheduled", id: result.insertId });
  });
};


exports.getAllScheduledPickups = (req, res) => {
  const sql = `
    SELECT pr.*, d.amount, c.name AS category_name, donors.name AS donor_name
    FROM pickup_requests pr
    JOIN donations d ON pr.donation_id = d.id
    JOIN donation_categories c ON d.category_id = c.id
    JOIN donors ON pr.donor_id = donors.id
    ORDER BY pr.pickup_time DESC`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch pickups" });
    res.status(200).json(results);
  });
};
