const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/donations/pdf', reportController.getDonationReportPdf);
router.get('/orphans/excel', reportController.getOrphanReportExcel);

module.exports = router;
