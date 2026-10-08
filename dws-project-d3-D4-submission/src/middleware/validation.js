const { body, param, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.array() });
  }
  next();
};

const validateMember = [
  body('full_name').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  handleValidationErrors
];

const validateCircle = [
  body('name').trim().notEmpty().withMessage('Circle name is required'),
  body('contribution_amount').isFloat({ gt: 0 }).withMessage('Contribution amount must be greater than 0'),
  body('cycle_frequency').isIn(['weekly', 'monthly']).withMessage('Frequency must be weekly or monthly'),
  body('max_members').isInt({ gt: 1 }).withMessage('Max members must be greater than 1'),
  handleValidationErrors
];

const validateContribution = [
  body('cycle_id').isInt({ gt: 0 }).withMessage('Valid cycle_id is required'),
  body('member_id').isInt({ gt: 0 }).withMessage('Valid member_id is required'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
  handleValidationErrors
];

const validatePayout = [
  body('cycle_id').isInt({ gt: 0 }).withMessage('Valid cycle_id is required'),
  body('recipient_id').isInt({ gt: 0 }).withMessage('Valid recipient_id is required'),
  body('total_amount').isFloat({ gt: 0 }).withMessage('Total amount must be greater than 0'),
  handleValidationErrors
];

module.exports = {
  validateMember,
  validateCircle,
  validateContribution,
  validatePayout
};
