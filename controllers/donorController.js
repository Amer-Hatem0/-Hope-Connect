exports.getAllDonors = (req, res) => {
  db.query('SELECT * FROM donors', (err, results) => {
    if (err) {
      logger.error('Error fetching donors:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

exports.getDonorById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM donors WHERE id = ?', [id], (err, results) => {
    if (err) {
      logger.error(`Error fetching donor ID ${id}:`, err);
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      logger.warn(`Donor not found - ID: ${id}`);
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json(results[0]);
  });
};

exports.createDonor = (req, res) => {
  const donor = req.body;

  db.query('INSERT INTO donors SET ?', donor, (err, result) => {
    if (err) {
      logger.error('Error creating donor:', err);
      return res.status(500).json({ error: err });
    }
    logger.info(`Donor created: ${donor.name}`);
    res.status(201).json({ message: 'Donor created successfully', id: result.insertId });
  });
};

exports.updateDonor = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  db.query('UPDATE donors SET ? WHERE id = ?', [updatedData, id], (err, result) => {
    if (err) {
      logger.error(`Error updating donor ID ${id}:`, err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      logger.warn(`Attempt to update non-existent donor ID: ${id}`);
      return res.status(404).json({ message: 'Donor not found' });
    }
    logger.info(`Donor updated - ID: ${id}`);
    res.status(200).json({ message: 'Donor updated successfully' });
  });
};

exports.deleteDonor = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM donors WHERE id = ?', [id], (err, result) => {
    if (err) {
      logger.error(`Error deleting donor ID ${id}:`, err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      logger.warn(`Attempt to delete non-existent donor ID: ${id}`);
      return res.status(404).json({ message: 'Donor not found' });
    }
    logger.info(`Donor deleted - ID: ${id}`);
    res.status(200).json({ message: 'Donor deleted successfully' });
  });
};
