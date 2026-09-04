const Product = require('../models/Product');
const Variant = require('../models/Variant');
const EmiPlan = require('../models/EmiPlan');

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function getVariantWithPlans(req, res, next) {
  try {
    const { slug, variantId } = req.params;
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      throw createError('Product not found', 404);
    }

    const variant = await Variant.findOne({ _id: variantId, productId: product._id }).lean();

    if (!variant) {
      throw createError('Variant not found', 404);
    }

    const emiPlans = await EmiPlan.find({ variantId: variant._id }).sort({ tenureMonths: 1 }).lean();

    res.json({
      success: true,
      data: {
        ...variant,
        emiPlans,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getVariantWithPlans,
};