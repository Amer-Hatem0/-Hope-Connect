 

const express = require('express');
const router = express.Router();
const apiController = require('../controllers/externalApiController');

 
router.get('/education/books', apiController.searchBooks);
router.get('/health/covid', apiController.getCovidStats);

module.exports = router;
