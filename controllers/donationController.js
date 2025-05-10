const db = require('../config/db.config');
const { sendEmail } = require('../services/emailService');

exports.getAllDonations = (req, res) => {
  db.query('SELECT * FROM donations', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.createDonation = (req, res) => {
  const donation = req.body;

  db.query('INSERT INTO donations SET ?', donation, async (err, result) => {
    if (err) return res.status(500).json({ error: err });

    await sendEmail(
       'amerhatem01@gmail.com',
      'New Donation Received',
      `A new donation of $${donation.amount} was received in category: ${donation.category}`
    );

    res.status(201).json({ message: 'Donation created successfully', id: result.insertId });
  });
};
