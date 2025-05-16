const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/emailService');

router.post('/impact-summary', async (req, res) => {
  try {
 
    const [donors] = await db.promise().query(`SELECT email, name FROM donors WHERE email IS NOT NULL`);

    const summaryMessage = `
📊 Weekly Impact Report:
- 5 Top Donors recognized
- 3 Campaigns successfully completed
- 20 Orphans supported this week
Thanks for your support! 💜
`;

  
    for (const donor of donors) {
      await sendEmail(
        donor.email,
        "Weekly Impact Summary - HopeConnect",
        `Dear ${donor.name},\n\n${summaryMessage}`
      );
    }

    res.status(200).json({ message: "Emails sent to all donors" });
  } catch (err) {
    console.error("Error sending impact summaries:", err);
    res.status(500).json({ error: "Failed to send emails" });
  }
});

module.exports = router;
