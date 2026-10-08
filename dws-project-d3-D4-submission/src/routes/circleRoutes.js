const express = require('express');
const router = express.Router();
const circleController = require('../controllers/circleController');
const { validateCircle } = require('../middleware/validation');

router.post('/', validateCircle, circleController.createCircle);
router.get('/', circleController.getAllCircles);
router.get('/:id', circleController.getCircleById);
router.get('/:id/members', circleController.getCircleMembers);
router.get('/:id/cycles', circleController.getCircleCycles);
router.put('/:id', circleController.updateCircle);
router.delete('/:id', circleController.deleteCircle);

module.exports = router;
