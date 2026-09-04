const Product = require('../models/Product');
const Variant = require('../models/Variant');
const EmiPlan = require('../models/EmiPlan');
const PlanSelection = require('../models/PlanSelection');

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function createPlanSelection(req, res, next) {
  try {
    const { variantId, emiPlanId } = req.body;

    if (!variantId || !emiPlanId) {
      throw createError('variantId and emiPlanId are required', 400);
    }

    const variant = await Variant.findById(variantId).lean();
    if (!variant) {
      throw createError('Variant not found', 404);
    }

    const emiPlan = await EmiPlan.findById(emiPlanId).lean();
    if (!emiPlan) {
      throw createError('EMI plan not found', 404);
    }

    if (String(emiPlan.variantId) !== String(variant._id)) {
      throw createError('EMI plan does not belong to selected variant', 400);
    }

    const selection = await PlanSelection.create({
      variantId: variant._id,
      emiPlanId: emiPlan._id,
    });

    res.status(201).json({
      success: true,
      message: 'EMI plan selected successfully',
      data: {
        selectionId: selection._id,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPlanSelection,
};