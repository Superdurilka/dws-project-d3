const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const { validatePayout } = require('../middleware/validation');

router.post('/', validatePayout, payoutController.createPayout);
router.get('/cycle/:cycleId', payoutController.getPayoutByCycle);

module.exports = router;
