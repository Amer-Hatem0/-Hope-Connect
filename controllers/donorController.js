const db = require('../config/db.config');
const logger = require('../utils/logger');


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

// exports.updateDonor = (req, res) => {
//   const { id } = req.params;
//   const updatedData = req.body;

//   db.query('UPDATE donors SET ? WHERE id = ?', [updatedData, id], (err, result) => {
//     if (err) {
//       logger.error(`Error updating donor ID ${id}:`, err);
//       return res.status(500).json({ error: err });
//     }
//     if (result.affectedRows === 0) {
//       logger.warn(`Attempt to update non-existent donor ID: ${id}`);
//       return res.status(404).json({ message: 'Donor not found' });
//     }
//     logger.info(`Donor updated - ID: ${id}`);
//     res.status(200).json({ message: 'Donor updated successfully' });
//   });
// };

exports.deleteDonor = (req, res) => {
  const { id } = req.params;

  db.query('SELECT COUNT(*) AS count FROM donations WHERE donor_id = ?', [id], (err, results) => {
    if (err) {
      console.error(`Error checking related donations for donor ID ${id}:`, err);
      return res.status(500).json({ error: "Failed to check related donations." });
    }

    if (results[0].count > 0) {
      return res.status(400).json({ message: "Cannot delete donor with existing donations." });
    }

    db.query('DELETE FROM donors WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error(`Error deleting donor ID ${id}:`, err);
        return res.status(500).json({ error: "Delete operation failed." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Donor not found.' });
      }

      res.status(200).json({ message: 'Donor deleted successfully.' });
    });
  });
};



exports.verifyDonor = (req, res) => {
  const donorId = req.params.id;
  const sql = `UPDATE donors SET is_verified = TRUE WHERE id = ?`;

  db.query(sql, [donorId], (err, result) => {
    if (err) return res.status(500).json({ error: "Verification failed" });
    res.status(200).json({ message: "Donor verified successfully" });
  });
};

// exports.updateLocation = (req, res) => {
//   const { id } = req.params;
//   const { location, latitude, longitude } = req.body;

//   if (!location || !latitude || !longitude) {
//     return res.status(400).json({ error: "Missing location data" });
//   }

//   const sql = `UPDATE donors SET location = ?, latitude = ?, longitude = ? WHERE id = ?`;
//   db.query(sql, [location, latitude, longitude, id], (err) => {
//     if (err) return res.status(500).json({ error: "Location update failed" });
//     res.json({ message: "Donor location updated" });
//   });
// };

 

// exports.updateLocation = (req, res) => {
//   const { donorId } = req.params;
//   const { location, latitude, longitude } = req.body;

//   if (!location || !latitude || !longitude) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const sql = `
//     UPDATE donors
//     SET location = ?, latitude = ?, longitude = ?
//     WHERE id = ?
//   `;

//   db.query(sql, [location, latitude, longitude, donorId], (err, result) => {
//     if (err) {
//       console.error("Error updating location:", err);
//       return res.status(500).json({ error: "Database error" });
//     }

//     res.status(200).json({ message: "Location updated successfully" });
//   });
// };


 
exports.getDonorByUserId = (req, res) => {
  const userId = req.params.userId;
  db.query("SELECT * FROM donors WHERE user_id = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Donor not found" });
    res.status(200).json(results[0]);
  });
};

exports.updateDonor = (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    address,
   
    location,
    latitude,
    longitude,
    is_verified
  } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing donor ID" });
  }

   const updatedFields = {
    ...(name && { name }),
    ...(email && { email }),
    ...(phone && { phone }),
    ...(address && { address }),
   
    ...(location && { location }),
    ...(latitude && { latitude }),
    ...(longitude && { longitude }),
    ...(typeof is_verified !== "undefined" && { is_verified }),
  };

   if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: "No valid fields provided for update" });
  }

   db.query('UPDATE donors SET ? WHERE id = ?', [updatedFields, id], (err, result) => {
    if (err) {
      console.error(`Error updating donor ID ${id}:`, err);
      return res.status(500).json({ error: "Database update failed" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json({ message: 'Donor updated successfully' });
  });
};
