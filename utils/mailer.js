 
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmergencyDonationEmail = async (donorEmail, amount, category) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: donorEmail,
    subject: "Thank You for Your Emergency Donation!",
    text: `We deeply appreciate your emergency donation of $${amount} under the category: ${category}. Your contribution brings hope and relief to those in urgent need.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Emergency donation email sent.");
  } catch (err) {
    console.error("Failed to send donation email:", err);
  }
};

module.exports = { sendEmergencyDonationEmail };
