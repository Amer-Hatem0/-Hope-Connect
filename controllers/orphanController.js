const db = require('../config/db.config');
const { sendEmail } = require('../services/emailService');

//  1. Get all orphans
exports.getAllOrphans = (req, res) => {
  db.query('SELECT * FROM orphans', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.getAllOrphans = (req, res) => {
  const { age, name, education_status, health_condition, current_status } = req.query;

  let query = 'SELECT * FROM orphans WHERE 1=1';
  const values = [];

  if (age) {
    query += ' AND age = ?';
    values.push(age);
  }

  if (name) {
    query += ' AND name LIKE ?';
    values.push(`%${name}%`);
  }

  if (education_status) {
    query += ' AND education_status = ?';
    values.push(education_status);
  }

  if (health_condition) {
    query += ' AND health_condition = ?';
    values.push(health_condition);
  }

  if (current_status) {
    query += ' AND current_status = ?';
    values.push(current_status);
  }

  db.query(query, values, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

//   2. Get orphan by ID
exports.getOrphanById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM orphans WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'The orphan is not present  ' });
    res.status(200).json(results[0]);
  });
};

//   3. Create new orphan
// exports.createOrphan = (req, res) => {
//   const orphan = req.body;
//   db.query('INSERT INTO orphans SET ?', orphan, (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(201).json({ message: 'A new orphan has been added.', id: result.insertId });
//   });
// };

exports.createOrphan = (req, res) => {
  const orphan = req.body;

  db.query('INSERT INTO orphans SET ?', orphan, async (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // إرسال إشعار
    await sendEmail(
      'your_notification_email@example.com',  // البريد الذي يستلم الإشعار
      'New Orphan Added',
      `A new orphan has been added: ${orphan.name}, Age: ${orphan.age}`
    );

    res.status(201).json({ message: 'Orphan created successfully', id: result.insertId });
  });
};

//   4. Update orphan
exports.updateOrphan = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  db.query('UPDATE orphans SET ? WHERE id = ?', [updatedData, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'The orphan is not present ' });
    res.status(200).json({ message: 'Modified successfully  ' });
  });
};

//   5. Delete orphan
exports.deleteOrphan = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM orphans WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: ' The orphan is not present ' });
    res.status(200).json({ message: 'The orphan has been successfully removed.      ' });
  });
};
