const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { validateMember } = require('../middleware/validation');

router.post('/', validateMember, memberController.createMember);
router.get('/', memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);

module.exports = router;
