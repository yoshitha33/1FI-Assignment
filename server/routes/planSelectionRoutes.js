const express = require('express');
const { createPlanSelection } = require('../controllers/planSelectionController');

const router = express.Router();

router.post('/', createPlanSelection);

module.exports = router;