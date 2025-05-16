const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerDocs = require('./swagger');
 require('dotenv').config();



const orphanRoutes = require('./routes/orphanRoutes');
const donorRoutes = require('./routes/donorRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const donationRoutes = require('./routes/donationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const reportRoutes = require('./routes/reportRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orphanUpdateRoutes = require('./routes/orphanUpdateRoutes');
const impactRoutes = require('./routes/impactReportRoutes');
const externalApiRoutes = require('./routes/externalApiRoutes');
const sponsorshipRoutes = require('./routes/sponsorshipRoutes');
const transparencyRoutes = require('./routes/transparencyRoutes');
const ratingsRoutes = require('./routes/ratings');
const logisticsRoutes = require('./routes/logisticsRoutes');
const pickupRoutes = require('./routes/pickupRoutes');
const partnersRoutes = require('./routes/partnersRoutes');







const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/orphans', orphanRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/service-requests', serviceRequestRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orphan-updates', orphanUpdateRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/external', externalApiRoutes);
app.use('/api/sponsorships', sponsorshipRoutes);
app.use('/api/emergency-donations', require('./routes/emergencyDonationRoutes'));
app.use('/api/transparency', transparencyRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use('/api/logistics', logisticsRoutes);
app.use('/api/logistics', pickupRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/notifications', require('./routes/notificationRoutes'));






swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
