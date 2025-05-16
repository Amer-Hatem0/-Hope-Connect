const db = require('../config/db.config');
const { sendEmail } = require('../services/emailService');

exports.getAllDonations = (req, res) => {
  db.query('SELECT * FROM donations', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
};
exports.createDonation = async (req, res) => {
  const { donor_id, amount, category_id } = req.body;

  if (!donor_id || !amount || !category_id) {
    return res.status(400).json({ error: 'Missing required fields: donor_id, amount, category_id' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  const feeRate = 0.05; // 5% رسوم
  const fee = amount * feeRate;
  const netAmount = amount - fee;

  const sql = `INSERT INTO donations (donor_id, amount, category_id) VALUES (?, ?, ?)`;

  try {
    // ✅ Get category name based on category_id
    const categorySql = 'SELECT name FROM donation_categories WHERE id = ?';
    db.query(categorySql, [category_id], (catErr, catResult) => {
      if (catErr || catResult.length === 0) {
        console.error('Category lookup failed:', catErr);
        return res.status(400).json({ error: 'Invalid category_id' });
      }

      const categoryName = catResult[0].name;

      db.query(sql, [donor_id, netAmount, category_id], async (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to create donation' });
        }

        // ✅ Now categoryName is valid
        try {
          await sendEmail(
            'amerhatem01@gmail.com',
            'New Donation Received',
            `A new donation of $${amount} was received in category: ${categoryName}`
          );
        } catch (emailErr) {
          console.error('Email sending failed:', emailErr);
        }

        res.status(201).json({
          message: 'Donation created successfully',
          id: result.insertId,
        });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
