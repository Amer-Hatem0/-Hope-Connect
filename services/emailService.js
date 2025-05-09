const nodemailer = require('nodemailer');

 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kellie.strosin99@ethereal.email',          
    pass: '7s4mJK6Mq2V54wEp1x'        
  }
});

 
exports.sendEmail = async (to, subject, message) => {
  const mailOptions = {
    from: '"HopeConnect" <amer23102002@gmail.com>',
    to,
    subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (err) {
    console.error(' Failed to send email:', err);
  }
};
