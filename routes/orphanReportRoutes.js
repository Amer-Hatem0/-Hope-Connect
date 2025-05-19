const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const orphanReportController = require('../controllers/orphanReportController');

// Multer config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), orphanReportController.uploadReport);
router.get('/:orphanId', orphanReportController.getReportsByOrphan);




module.exports = router;


