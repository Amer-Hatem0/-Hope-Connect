 
const db = require('../config/db.config');
const logger = require('../utils/logger');

// Get all campaigns
exports.getAllCampaigns = (req, res) => {
  db.query('SELECT * FROM campaigns', (err, results) => {
    if (err) {
      logger.error('Error fetching campaigns:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

// Create campaign
const { sendEmail } = require('../services/emailService');

exports.createCampaign = async (req, res) => {
  const { name, description, goal_amount, collected_amount, status } = req.body;

  const sql = `
    INSERT INTO campaigns (name, description, goal_amount, collected_amount, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, description, goal_amount, collected_amount || 0, status || 'active'], async (err, result) => {
    if (err) {
      console.error("Error creating campaign:", err);
      return res.status(500).json({ error: 'Database error' });
    }

   
    if (status === 'emergency') {
      try {
        await sendEmail(
          "amerhatem01@gmail.com",  
          "🚨 Emergency Campaign Created",
          `A new emergency campaign "${name}" was created.\n\nPlease consider urgent support.`
        );
      } catch (e) {
        console.error("Email error:", e);
      }
    }

    res.status(201).json({ message: 'Campaign created successfully', id: result.insertId });
  });
};


// Update campaign


exports.updateCampaign = (req, res) => {
  const { id } = req.params;
  const { name, description, goal_amount, collected_amount, status } = req.body;

  const sql = `
    UPDATE campaigns
    SET name = ?, description = ?, goal_amount = ?, collected_amount = ?, status = ?
    WHERE id = ?
  `;

  db.query(sql, [name, description, goal_amount, collected_amount, status, id], async (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: "Database update failed" });
    }
 
    if (Number(collected_amount) >= Number(goal_amount)) {
      try {
        await sendEmail(
          "amerhatem01@gmail.com",  
          `Campaign Goal Reached: ${name}`,
          `🎉 The campaign "${name}" has successfully reached its goal of $${goal_amount}.`
        );
      } catch (err) {
        console.error("Failed to send campaign goal email:", err);
      }
    }

    res.status(200).json({ message: "Campaign updated successfully" });
  });
};


// Delete campaign
exports.deleteCampaign = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM campaigns WHERE id = ?', [id], (err, result) => {
    if (err) {
      logger.error(`Error deleting campaign ID ${id}:`, err);
      return res.status(500).json({ error: err });
    }
    if (result.affectedRows === 0) {
      logger.warn(`Attempt to delete non-existent campaign ID: ${id}`);
      return res.status(404).json({ message: 'Campaign not found' });
    }

    logger.info(`Campaign deleted successfully - ID: ${id}`);
    res.status(200).json({ message: 'Campaign deleted successfully' });
  });
};



exports.donateToCampaign = (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid donation amount" });
  }

  const sql = `
    UPDATE campaigns
    SET collected_amount = collected_amount + ?
    WHERE id = ?
  `;

  db.query(sql, [amount, id], (err, result) => {
    if (err) {
      console.error("Donation failed:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Donation successful" });
  });
};

 

// Volunteer joins campaign
exports.volunteerJoinCampaign = (req, res) => {
  const { volunteerId, campaignId } = req.body;
  const sql = `INSERT INTO volunteer_campaigns (volunteer_id, campaign_id) VALUES (?, ?)`;
  db.query(sql, [volunteerId, campaignId], (err) => {
    if (err) return res.status(500).json({ error: "Join failed" });
    res.status(200).json({ message: "Joined successfully" });
  });
};

// Volunteer leaves campaign
exports.volunteerLeaveCampaign = (req, res) => {
  const { volunteerId, campaignId } = req.body;
  const sql = `DELETE FROM volunteer_campaigns WHERE volunteer_id = ? AND campaign_id = ?`;
  db.query(sql, [volunteerId, campaignId], (err) => {
    if (err) return res.status(500).json({ error: "Leave failed" });
    res.status(200).json({ message: "Left successfully" });
  });
};

// Get all campaigns volunteered in
exports.getCampaignsByVolunteer = (req, res) => {
  const { volunteerId } = req.params;
  const sql = `
    SELECT c.* FROM campaigns c
    JOIN volunteer_campaigns vc ON c.id = vc.campaign_id
    WHERE vc.volunteer_id = ?
  `;
  db.query(sql, [volunteerId], (err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching campaigns" });
    res.status(200).json(results);
  });
};
