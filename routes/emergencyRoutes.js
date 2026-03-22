/**
 * @swagger
 * tags:
 *   name: Emergency
 *   description: Emergency operations
 */

/**
 * @swagger
 * /api/emergency/report:
 *   post:
 *     summary: Report a new emergency
 *     tags: [Emergency]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - latitude
 *               - longitude
 *             properties:
 *               type:
 *                 type: string
 *                 example: accident
 *               latitude:
 *                 type: number
 *                 example: 6.5244
 *               longitude:
 *                 type: number
 *                 example: 3.3792
 *     responses:
 *       201:
 *         description: Emergency created and responder assigned
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/emergency/stats:
 *   get:
 *     summary: Get emergency statistics
 *     tags: [Emergency]
 *     responses:
 *       200:
 *         description: Returns total, pending, and resolved emergencies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   example: 10
 *                 pending:
 *                   type: number
 *                   example: 2
 *                 resolved:
 *                   type: number
 *                   example: 8
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/emergency/responders:
 *   get:
 *     summary: List all responders
 *     tags: [Emergency]
 *     responses:
 *       200:
 *         description: Returns a list of responders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   status:
 *                     type: string
 *                     example: available
 *       500:
 *         description: Server error
 */
const router2 = require("express").Router();
const auth = require("../middlewares/auth");
const { reportEmergency, getStats } = require("../controllers/emergencyController");

router2.post("/report", auth, reportEmergency);
router2.get("/stats", getStats);

module.exports = router2;