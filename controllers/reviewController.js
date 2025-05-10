const db = require('../config/db.config');
const logger = require('../utils/logger');

// Get all reviews
exports.getAllReviews = (req, res) => {
  const sql = `
    SELECT reviews.*, donors.name AS donor_name
    FROM reviews
    JOIN donors ON reviews.donor_id = donors.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      logger.error('Error fetching reviews:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

// Create review
exports.createReview = (req, res) => {
  const { donor_id, orphan_id, rating, comment } = req.body;

  const review = { donor_id, orphan_id, rating, comment };

  db.query('INSERT INTO reviews SET ?', review, (err, result) => {
    if (err) {
      logger.error('Error creating review:', err);
      return res.status(500).json({ error: err });
    }
    logger.info(`Review created by donor ${donor_id}`);
    res.status(201).json({ message: 'Review submitted successfully', id: result.insertId });
  });
};
