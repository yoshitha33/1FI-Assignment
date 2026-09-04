const mongoose = require('mongoose');

const emiPlanSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Variant',
      required: true,
      index: true,
    },
    tenureMonths: {
      type: Number,
      required: true,
      min: 1,
    },
    monthlyAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    interestRate: {
      type: Number,
      required: true,
      min: 0,
    },
    cashbackAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    processingFee: {
      type: Number,
      required: true,
      min: 0,
    },
    providerName: {
      type: String,
      required: true,
      trim: true,
    },
    isMutualFundBacked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('EmiPlan', emiPlanSchema);