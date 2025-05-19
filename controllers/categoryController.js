const db = require('../config/db.config');

exports.getAllCategories = (req, res) => {
  const sql = 'SELECT id, name FROM donation_categories';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching donation categories:', err);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }

    res.status(200).json(results);
  });
};
