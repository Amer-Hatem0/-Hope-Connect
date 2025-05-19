// routes/bookDonationRoutes.js
const express = require("express");
const router = express.Router();
const bookDonationController = require("../controllers/bookDonationController");
const authMiddleware = require("../middleware/authMiddleware");
 
 

 
router.get("/book-donations/by-orphan/:id", bookDonationController.getByOrphan);



router.post("/book-donations", authMiddleware, bookDonationController.donateBook);
router.get("/book-donations/by-donor/:donorId", bookDonationController.getByDonor);   
router.get("/book-donations/by-orphan/:orphanId", bookDonationController.getByOrphan);

module.exports = router;
