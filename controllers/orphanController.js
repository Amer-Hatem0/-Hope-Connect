 


 
const db = require('../config/db.config');
const logger = require('../utils/logger');
const { sendEmail } = require('../services/emailService');
exports.sendSupportMessage = (req, res) => {
  const { id } = req.params;
  const { support_message } = req.body;

  if (!support_message) {
    return res.status(400).json({ error: "Support message is required" });
  }

  const sql = 'UPDATE orphans SET support_message = ? WHERE id = ?';
  db.query(sql, [support_message, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to send message" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Orphan not found" });

    res.status(200).json({ message: "Support message sent successfully" });
  });
};
exports.getAllOrphans = (req, res) => {
  db.query('SELECT * FROM orphans', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.getOrphanById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM orphans WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Orphan not found' });
    res.status(200).json(results[0]);
  });
};

exports.createOrphan = (req, res) => {
  const { name, age, current_status } = req.body;
  const image_url = req.file?.path || null;

  const sql = 'INSERT INTO orphans (name, age, current_status, image_url) VALUES (?, ?, ?, ?)';
  const values = [name, age, current_status, image_url];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Orphan created successfully', id: result.insertId });
  });
};

exports.updateOrphan = (req, res) => {
  const { id } = req.params;
  const { name, age, current_status } = req.body;
  const image_url = req.files?.image?.[0]?.path || null;

  const data = { name, age, current_status };
  if (image_url) data.image_url = image_url;

  db.query('UPDATE orphans SET ? WHERE id = ?', [data, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Orphan not found' });
    res.status(200).json({ message: 'Orphan updated successfully' });
  });
};

// exports.uploadOrphanReport = (req, res) => {
//   const { orphan_id } = req.body;
//   const report_image = req.files?.report?.[0]?.path || null;

//   if (!orphan_id || !report_image) {
//     return res.status(400).json({ error: 'Missing orphan_id or report file' });
//   }

//   const sql = 'INSERT INTO orphan_reports (orphan_id, image_url) VALUES (?, ?)';
//   db.query(sql, [orphan_id, report_image], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(201).json({ message: 'Report uploaded successfully' });
//   });
// };
// exports.uploadOrphanReport = (req, res) => {
//   const { orphan_id } = req.body;
//   const report_url = req.file ? `/uploads/${req.file.filename}` : null;

//   if (!orphan_id || !report_url) {
//     return res.status(400).json({ error: 'Missing orphan_id or report file' });
//   }

//   const sql = `UPDATE orphans SET report_url = ? WHERE id = ?`;
//   db.query(sql, [report_url, orphan_id], (err, result) => {
//     if (err) {
//       console.error('Failed to update report_url:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }
//     res.status(200).json({ message: 'Report uploaded successfully' });
//   });
// };


exports.uploadOrphanReport = (req, res) => {
  const { orphan_id, report_text } = req.body;
  const image_url = req.files?.report?.[0]?.path ? `/uploads/${req.files.report[0].filename}` : null;

  if (!orphan_id || !image_url || !report_text) {
    return res.status(400).json({ error: 'Missing orphan_id, report text, or report file' });
  }

  const sql = 'INSERT INTO orphan_reports (orphan_id, report_text, image_url) VALUES (?, ?, ?)';
  db.query(sql, [orphan_id, report_text, image_url], (err, result) => {
    if (err) {
      console.error('Failed to insert orphan report:', err);
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
      console.error("Error fetching reports:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(200).json(results);
  });
};

exports.deleteOrphan = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM orphans WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Orphan not found' });
    res.status(200).json({ message: 'Orphan deleted' });
  });
};
exports.getorphansByUserId = (req, res) => {
  const userId = req.params.userId;
  db.query("SELECT * FROM orphans WHERE user_id = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json(results[0]);
  });
};