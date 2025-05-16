const db = require('../config/db.config');
const logger = require('../utils/logger');

 
 
const { sendEmail } = require('../services/emailService');

exports.createSponsorship = (req, res) => {
  const { orphan_id, donor_id, amount, frequency, end_date } = req.body;

  if (!orphan_id || !donor_id || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
    INSERT INTO sponsorships (orphan_id, donor_id, amount, frequency, end_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [orphan_id, donor_id, amount, frequency || 'monthly', end_date], async (err, result) => {
    if (err) {
      console.error("Error creating sponsorship:", err);
      return res.status(500).json({ error: "Database error" });
    }

    try {
      await sendEmail(
        'amerhatem01@gmail.com',
        'New Sponsorship Created',
        `A donor has sponsored orphan ID ${orphan_id} with $${amount} (${frequency}).`
      );
    } catch (err) {
      console.error("Email failed:", err);
    }

    res.status(201).json({ message: "Sponsorship created", id: result.insertId });
  });
};


exports.getSponsorships = (req, res) => {
  const sql = `SELECT s.*, o.name AS orphan_name, d.name AS donor_name
               FROM sponsorships s
               JOIN orphans o ON s.orphan_id = o.id
               JOIN donors d ON s.donor_id = d.id`;

  db.query(sql, (err, results) => {
    if (err) {
      logger.error('Error fetching sponsorships:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};
