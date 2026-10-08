const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contributionController');
const { validateContribution } = require('../middleware/validation');

router.post('/', validateContribution, contributionController.createContribution);
router.get('/cycle/:cycleId', contributionController.getContributionsByCycle);
router.get('/member/:memberId', contributionController.getContributionsByMember);

module.exports = router;
