const express = require('express');
const router = express.Router();
const circleController = require('../controllers/circleController');

router.get('/:id/members', circleController.getCircleMembers);
router.get('/:id/cycles', circleController.getCircleCycles);

module.exports = router;