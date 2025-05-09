const db = require('../config/db.config');

// Get all campaigns
exports.getAllCampaigns = (req, res) => {
  db.query('SELECT * FROM campaigns', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

// Create campaign
exports.createCampaign = (req, res) => {
  const campaign = req.body;
  db.query('INSERT INTO campaigns SET ?', campaign, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Campaign created successfully', id: result.insertId });
  });
};

// Update campaign
exports.updateCampaign = (req, res) => {
  const { id } = req.params;
  const updated = req.body;
  db.query('UPDATE campaigns SET ? WHERE id = ?', [updated, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json({ message: 'Campaign updated successfully' });
  });
};

// Delete campaign
exports.deleteCampaign = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM campaigns WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json({ message: 'Campaign deleted successfully' });
  });
};
