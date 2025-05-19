const db = require('../config/db.config');
const path = require('path');

exports.uploadReport = (req, res) => {
  const { orphan_id, report_text } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `INSERT INTO orphan_reports (orphan_id, report_text, image_url) VALUES (?, ?, ?)`;
  db.query(sql, [orphan_id, report_text, image_url], (err, result) => {
    if (err) {
      console.error('Failed to insert report:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Report uploaded successfully' });
  });
};

exports.getReportsByOrphan = (req, res) => {
  const { orphanId } = req.params;
  const sql = `SELECT * FROM orphan_reports WHERE orphan_id = ? ORDER BY created_at DESC`;

  db.query(sql, [orphanId], (err, results) => {
    if (err) {
      console.error('Failed to fetch reports:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};


 

exports.uploadOrphanImage = (req, res) => {
  const orphanId = req.params.id;
  const imageUrl = `/uploads/${req.file.filename}`;

  const sql = `UPDATE orphans SET image_url = ? WHERE id = ?`;
  db.query(sql, [imageUrl, orphanId], (err, result) => {
    if (err) {
      console.error("Error updating orphan image:", err);
      return res.status(500).json({ error: "Failed to upload image" });
    }
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  });
};

exports.getAllOrphans = (req, res) => {
  const sql = `SELECT * FROM orphans`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch orphans" });
    res.status(200).json(results);
  });
};
