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
const { donor_id, orphan_id, organizations_id, rating, comment } = req.body;

 
const sql = `
  INSERT INTO reviews (donor_id, orphan_id, organization_id, rating, comment)
  VALUES (?, ?, ?, ?, ?)
`;
db.query(sql, [donor_id, orphan_id, organizations_id, rating, comment], (err, result) => {
  if (err) {
    console.error("Error creating review:", err);
    return res.status(500).json({ error: "Database error" });
  }

  res.status(201).json({ message: "Review submitted successfully", reviewId: result.insertId });
});}
