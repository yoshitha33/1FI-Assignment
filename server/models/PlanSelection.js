const mongoose = require('mongoose');

const planSelectionSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Variant',
      required: true,
    },
    emiPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmiPlan',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PlanSelection', planSelectionSchema);