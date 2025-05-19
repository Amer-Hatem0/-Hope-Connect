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



exports.getByDonor = (req, res) => {
  const donorId = req.params.donorId;
  const sql = `
    SELECT s.*, o.name AS orphan_name
    FROM sponsorships s
    JOIN orphans o ON s.orphan_id = o.id
    WHERE s.donor_id = ?
  `;
  db.query(sql, [donorId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(results);
  });
};


 

// Get sponsorships by orphan ID
exports.getSponsorshipsByOrphan = (req, res) => {
  const { orphanId } = req.params;

  const sql = `
    SELECT 
      s.id,
      s.amount,
      s.frequency,
      s.start_date,
      s.end_date,
      s.status,
      d.name AS donor_name
    FROM sponsorships s
    JOIN donors d ON s.donor_id = d.id
    WHERE s.orphan_id = ?
    ORDER BY s.start_date DESC
  `;

  db.query(sql, [orphanId], (err, results) => {
    if (err) {
      console.error("Error fetching sponsorships for orphan:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
};
