const db = require('../config/db.config');
const logger = require('../utils/logger');

 

exports.getDonorTransparency = (req, res) => {
  const sql = `SELECT * FROM donor_transparency_report`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
};
