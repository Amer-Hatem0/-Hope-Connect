// ✅ controllers/impactReportController.js

const db = require('../config/db.config');
const logger = require('../utils/logger');

//   أعلى المتبرعين
exports.getTopDonors = (req, res) => {
  const sql = `
    SELECT donors.name, COUNT(donations.id) AS donation_count, SUM(donations.amount) AS total_amount
    FROM donors
    JOIN donations ON donors.id = donations.donor_id
    GROUP BY donors.id
    ORDER BY total_amount DESC
    LIMIT 5
  `;

  db.query(sql, (err, results) => {
    if (err) {
      logger.error('Error fetching top donors:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

//   الحملات الناجحة
exports.getSuccessfulCampaigns = (req, res) => {
  const sql = `
    SELECT name, goal_amount, collected_amount
    FROM campaigns
    WHERE collected_amount >= goal_amount
  `;

  db.query(sql, (err, results) => {
    if (err) {
      logger.error('Error fetching successful campaigns:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

//   الأيتام الأكثر دعمًا
exports.getMostSupportedOrphans = (req, res) => {
  const sql = `
    SELECT orphans.name, COUNT(service_requests.id) AS support_count
    FROM orphans
    JOIN service_requests ON orphans.id = service_requests.orphan_id
    GROUP BY orphans.id
    ORDER BY support_count DESC
    LIMIT 5
  `;

  db.query(sql, (err, results) => {
    if (err) {
      logger.error('Error fetching most supported orphans:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};

//   المتطوعون الأكثر نشاطًا
exports.getTopVolunteers = (req, res) => {
  const sql = `
    SELECT volunteers.name, COUNT(service_requests.id) AS assigned_requests
    FROM volunteers
    JOIN service_requests ON volunteers.id = service_requests.volunteer_id
    GROUP BY volunteers.id
    ORDER BY assigned_requests DESC
    LIMIT 5
  `;

  db.query(sql, (err, results) => {
    if (err) {
      logger.error('Error fetching top volunteers:', err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
};
