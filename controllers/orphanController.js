 
// const db = require('../config/db.config');
// const logger = require('../utils/logger');
// const { sendEmail } = require('../services/emailService');

// //  1. Get all orphans with filters
// exports.getAllOrphans = (req, res) => {
//   const { age, name, education_status, health_condition, current_status } = req.query;

//   let query = 'SELECT * FROM orphans WHERE 1=1';
//   const values = [];

//   if (age) {
//     query += ' AND age = ?';
//     values.push(age);
//   }
//   if (name) {
//     query += ' AND name LIKE ?';
//     values.push(`%${name}%`);
//   }
//   if (education_status) {
//     query += ' AND education_status = ?';
//     values.push(education_status);
//   }
//   if (health_condition) {
//     query += ' AND health_condition = ?';
//     values.push(health_condition);
//   }
//   if (current_status) {
//     query += ' AND current_status = ?';
//     values.push(current_status);
//   }

//   db.query(query, values, (err, results) => {
//     if (err) {
//       logger.error('Error fetching orphans:', err);
//       return res.status(500).json({ error: err });
//     }
//     res.status(200).json(results);
//   });
// };

// //  2. Get orphan by ID
// exports.getOrphanById = (req, res) => {
//   const { id } = req.params;
//   db.query('SELECT * FROM orphans WHERE id = ?', [id], (err, results) => {
//     if (err) {
//       logger.error(`Error fetching orphan ID ${id}:`, err);
//       return res.status(500).json({ error: err });
//     }
//     if (results.length === 0) {
//       logger.warn(`Orphan ID not found: ${id}`);
//       return res.status(404).json({ message: 'The orphan is not present' });
//     }
//     res.status(200).json(results[0]);
//   });
// };

// //  3. Create orphan + email notification
// exports.createOrphan = (req, res) => {
//   const orphan = req.body;

//   db.query('INSERT INTO orphans SET ?', orphan, async (err, result) => {
//     if (err) {
//       logger.error('Error creating orphan:', err);
//       return res.status(500).json({ error: err });
//     }

//     logger.info(`Orphan created: ${orphan.name}`);

//     try {
//       await sendEmail(
//         'amerhatem01@gmail.com',
//         'New Orphan Added',
//         `A new orphan has been added: ${orphan.name}, Age: ${orphan.age}`
//       );
//     } catch (emailErr) {
//       logger.warn('Orphan created but email failed:', emailErr);
//     }

//     res.status(201).json({ message: 'Orphan created successfully', id: result.insertId });
//   });
// };

 

 
//   const db = require('../config/db.config');
// const logger = require('../utils/logger');
// const { sendEmail } = require('../services/emailService');

// exports.getAllOrphans = (req, res) => {
//   db.query('SELECT * FROM orphans', (err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(200).json(results);
//   });
// };

// exports.getOrphanById = (req, res) => {
//   const { id } = req.params;
//   db.query('SELECT * FROM orphans WHERE id = ?', [id], (err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     if (results.length === 0) return res.status(404).json({ message: 'Orphan not found' });
//     res.status(200).json(results[0]);
//   });
// };

// exports.createOrphan = (req, res) => {
//   const { name, age, current_status } = req.body;
//   let image_url = req.file?.path || null;

//   const orphan = { name, age, current_status, image_url };
//   db.query('INSERT INTO orphans SET ?', orphan, (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(201).json({ message: 'Orphan created successfully', id: result.insertId });
//   });
// };

// exports.updateOrphan = (req, res) => {
//   const { id } = req.params;
//   const { name, age, current_status } = req.body;
//   const image_url = req.files?.image?.[0]?.path || null;

//   const data = { name, age, current_status };
//   if (image_url) data.image_url = image_url;

//   db.query('UPDATE orphans SET ? WHERE id = ?', [data, id], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     if (result.affectedRows === 0) return res.status(404).json({ message: 'Orphan not found' });
//     res.status(200).json({ message: 'Orphan updated successfully' });
//   });
// };

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

// exports.deleteOrphan = (req, res) => {
//   const { id } = req.params;
//   db.query('DELETE FROM orphans WHERE id = ?', [id], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     if (result.affectedRows === 0) return res.status(404).json({ message: 'Orphan not found' });
//     res.status(200).json({ message: 'Orphan deleted' });
//   });
// };



 
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

exports.uploadOrphanReport = (req, res) => {
  const { orphan_id } = req.body;
  const report_image = req.files?.report?.[0]?.path || null;

  if (!orphan_id || !report_image) {
    return res.status(400).json({ error: 'Missing orphan_id or report file' });
  }

  const sql = 'INSERT INTO orphan_reports (orphan_id, image_url) VALUES (?, ?)';
  db.query(sql, [orphan_id, report_image], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Report uploaded successfully' });
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