const db = require('../config/db.config');
const logger = require('../utils/logger');

// Dashboard Stats
exports.getStats = (req, res) => {
  const stats = {};

  db.query('SELECT COUNT(*) AS count FROM orphans', (err, orphanResult) => {
    if (err) {
      logger.error('Error fetching orphan count:', err);
      return res.status(500).json({ error: err });
    }
    stats.orphans = orphanResult[0].count;

    db.query('SELECT COUNT(*) AS count FROM donors', (err, donorResult) => {
      if (err) {
        logger.error('Error fetching donor count:', err);
        return res.status(500).json({ error: err });
      }
      stats.donors = donorResult[0].count;

      db.query('SELECT COUNT(*) AS count FROM volunteers', (err, volunteerResult) => {
        if (err) {
          logger.error('Error fetching volunteer count:', err);
          return res.status(500).json({ error: err });
        }
        stats.volunteers = volunteerResult[0].count;

        db.query('SELECT IFNULL(SUM(amount), 0) AS total FROM donations', (err, donationResult) => {
          if (err) {
            logger.error('Error fetching donation sum:', err);
            return res.status(500).json({ error: err });
          }
          stats.total_donations = parseFloat(donationResult[0].total);
          logger.info('Dashboard stats fetched');
          res.status(200).json(stats);
        });
      });
    });
  });
};
