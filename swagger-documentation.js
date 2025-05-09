/**
 * @swagger
 * tags:
 *   name: Orphans
 *   description: Orphan management
 */

/**
 * @swagger
 * /api/orphans:
 *   get:
 *     summary: Get all orphans
 *     tags: [Orphans]
 *     responses:
 *       200:
 *         description: List of orphans
 */

/**
 * @swagger
 * /api/orphans/{id}:
 *   get:
 *     summary: Get orphan by ID
 *     tags: [Orphans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orphan found
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/orphans:
 *   post:
 *     summary: Add new orphan
 *     tags: [Orphans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               education_status:
 *                 type: string
 *               health_condition:
 *                 type: string
 *     responses:
 *       201:
 *         description: Orphan added
 */

/**
 * @swagger
 * /api/orphans/{id}:
 *   put:
 *     summary: Update orphan
 *     tags: [Orphans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Orphan updated
 */

/**
 * @swagger
 * /api/orphans/{id}:
 *   delete:
 *     summary: Delete orphan
 *     tags: [Orphans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orphan deleted
 */

/**
 * @swagger
 * tags:
 *   name: Donors
 *   description: Donor management
 */

/**
 * @swagger
 * /api/donors:
 *   get:
 *     summary: Get all donors
 *     tags: [Donors]
 *     responses:
 *       200:
 *         description: List of donors
 */

/**
 * @swagger
 * /api/donors/{id}:
 *   get:
 *     summary: Get donor by ID
 *     tags: [Donors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Donor found
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/donors:
 *   post:
 *     summary: Add new donor
 *     tags: [Donors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Donor added
 */

/**
 * @swagger
 * /api/donors/{id}:
 *   put:
 *     summary: Update donor
 *     tags: [Donors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Donor updated
 */

/**
 * @swagger
 * /api/donors/{id}:
 *   delete:
 *     summary: Delete donor
 *     tags: [Donors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Donor deleted
 */

/**
 * @swagger
 * tags:
 *   name: Volunteers
 *   description: Volunteer management
 */

/**
 * @swagger
 * /api/volunteers:
 *   get:
 *     summary: Get all volunteers
 *     tags: [Volunteers]
 *     responses:
 *       200:
 *         description: List of volunteers
 */

/**
 * @swagger
 * /api/volunteers:
 *   post:
 *     summary: Add new volunteer
 *     tags: [Volunteers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Volunteer added
 */

/**
 * @swagger
 * /api/volunteers/{id}:
 *   put:
 *     summary: Update volunteer
 *     tags: [Volunteers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Volunteer updated
 */

/**
 * @swagger
 * /api/volunteers/{id}:
 *   delete:
 *     summary: Delete volunteer
 *     tags: [Volunteers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Volunteer deleted
 */

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: Donation management
 */

/**
 * @swagger
 * /api/donations:
 *   get:
 *     summary: Get all donations
 *     tags: [Donations]
 *     responses:
 *       200:
 *         description: List of donations
 */

/**
 * @swagger
 * /api/donations:
 *   post:
 *     summary: Create new donation
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Donation created
 */

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: Campaign management
 */

/**
 * @swagger
 * /api/campaigns:
 *   get:
 *     summary: Get all campaigns
 *     tags: [Campaigns]
 *     responses:
 *       200:
 *         description: List of campaigns
 */

/**
 * @swagger
 * /api/campaigns:
 *   post:
 *     summary: Create new campaign
 *     tags: [Campaigns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Campaign created
 */

/**
 * @swagger
 * /api/campaigns/{id}:
 *   put:
 *     summary: Update campaign
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Campaign updated
 */

/**
 * @swagger
 * /api/campaigns/{id}:
 *   delete:
 *     summary: Delete campaign
 *     tags: [Campaigns]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Campaign deleted
 */

/**
 * @swagger
 * tags:
 *   name: ServiceRequests
 *   description: Service Request management
 */

/**
 * @swagger
 * /api/service-requests:
 *   get:
 *     summary: Get all service requests
 *     tags: [ServiceRequests]
 *     responses:
 *       200:
 *         description: List of service requests
 */

/**
 * @swagger
 * /api/service-requests:
 *   post:
 *     summary: Create new service request
 *     tags: [ServiceRequests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Service request created
 */

/**
 * @swagger
 * /api/service-requests/{id}:
 *   put:
 *     summary: Update service request
 *     tags: [ServiceRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Service request updated
 */

/**
 * @swagger
 * /api/service-requests/{id}:
 *   delete:
 *     summary: Delete service request
 *     tags: [ServiceRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service request deleted
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in
 */
