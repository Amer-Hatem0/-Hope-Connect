 const logger = require('../utils/logger');
const db = require('../config/db.config');
const { sendEmergencyDonationEmail } = require('../utils/mailer');

exports.createEmergencyDonation = (req, res) => {
  const { donor_id, amount, category, email } = req.body;
  const sql = `INSERT INTO emergency_donations (donor_id, amount, category) VALUES (?, ?, ?)`;

  db.query(sql, [donor_id, amount, category], async (err, result) => {
    if (err) {
      console.error("Error inserting emergency donation:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (email) {
      await sendEmergencyDonationEmail(email, amount, category);
    }

    res.status(201).json({ message: "Emergency donation submitted successfully", id: result.insertId });
  });
};

exports.getEmergencyDonations = (req, res) => {
  const sql = `SELECT * FROM emergency_donations`;
  db.query(sql, (err, results) => {
    if (err) {
      logger.error("Failed to fetch emergency donations:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
};
