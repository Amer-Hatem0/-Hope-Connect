const db = require('../config/db.config');
 

exports.createPartner = (req, res) => {
const { name, description, contact_email, category, logo_url, website } = req.body;

db.query(
  'INSERT INTO partners (name, description, contact_email, category, logo_url, website) VALUES (?, ?, ?, ?, ?, ?)',
  [name, description, contact_email, category, logo_url, website],
  (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId });
  }
);

  
};



exports.getPartners = (req, res) => {
  db.query('SELECT * FROM partners', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};
