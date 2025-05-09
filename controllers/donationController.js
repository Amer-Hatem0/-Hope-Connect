const db = require('../config/db.config');
const { sendEmail } = require('../services/emailService');
// Get all donations
exports.getAllDonations = (req, res) => {
  db.query('SELECT * FROM donations', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

// Create new donation
// exports.createDonation = (req, res) => {
//   const donation = req.body;
//   db.query('INSERT INTO donations SET ?', donation, (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(201).json({ message: 'Donation created successfully', id: result.insertId });
//   });
// };



exports.createDonation = (req, res) => {
  const donation = req.body;

  db.query('INSERT INTO donations SET ?', donation, async (err, result) => {
    if (err) return res.status(500).json({ error: err });

    await sendEmail(
      'your_notification_email@example.com',
      'New Donation Received',
      `A new donation of $${donation.amount} was received in category: ${donation.category}`
    );

    res.status(201).json({ message: 'Donation created successfully', id: result.insertId });
  });
};
