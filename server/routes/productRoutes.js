const express = require('express');
const { getProducts, getProductBySlug } = require('../controllers/productController');
const { getVariantWithPlans } = require('../controllers/emiController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.get('/:slug/variants/:variantId', getVariantWithPlans);

module.exports = router;