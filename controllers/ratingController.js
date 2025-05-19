 
const db = require('../config/db.config');

exports.createRating = (req, res) => {
  const { donor_id, orphan_id, campaign_id, service_id, rating, comment } = req.body;

  const sql = `INSERT INTO ratings (donor_id, orphan_id, campaign_id, service_id, rating, comment) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [donor_id, orphan_id, campaign_id, service_id, rating, comment], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error', err });
    res.status(201).json({ message: 'Rating submitted successfully', id: result.insertId });
  });
};

exports.getAllRatings = (req, res) => {
  const sql = `SELECT * FROM ratings`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(200).json(results);
  });
};


 

// Get average or total rating for a specific donor
exports.getDonorRatings = (req, res) => {
  const { donorId } = req.params;

  const sql = `
    SELECT COUNT(*) AS total_ratings,
           AVG(rating) AS average_rating,
           SUM(rating) AS total_score
    FROM reviews
    WHERE donor_id = ?
  `;

  db.query(sql, [donorId], (err, results) => {
    if (err) {
      console.error("Error fetching donor ratings:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const stats = results[0];
    res.status(200).json({
      totalRatings: stats.total_ratings,
      averageRating: parseFloat(stats.average_rating).toFixed(2),
      totalScore: stats.total_score
    });
  });
};
