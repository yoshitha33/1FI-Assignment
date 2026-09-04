const Product = require('../models/Product');
const Variant = require('../models/Variant');
const EmiPlan = require('../models/EmiPlan');

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function formatProductListItem(product, variantsByProduct) {
  const variants = variantsByProduct.get(String(product._id)) || [];
  const lowestPricedVariant = [...variants].sort((left, right) => left.sellingPrice - right.sellingPrice)[0];

  return {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    category: product.category,
    imageUrl: lowestPricedVariant ? lowestPricedVariant.imageUrl : '',
    startingPrice: lowestPricedVariant ? lowestPricedVariant.sellingPrice : null,
  };
}

async function getProducts(req, res, next) {
  try {
    const { category } = req.query;
    const productFilter = category ? { category } : {};

    const products = await Product.find(productFilter).sort({ createdAt: -1 }).lean();
    const productIds = products.map((product) => product._id);
    const variants = await Variant.find({ productId: { $in: productIds } }).sort({ createdAt: 1 }).lean();

    const variantsByProduct = new Map();
    for (const variant of variants) {
      const key = String(variant.productId);
      if (!variantsByProduct.has(key)) {
        variantsByProduct.set(key, []);
      }
      variantsByProduct.get(key).push(variant);
    }

    res.json({
      success: true,
      data: products.map((product) => formatProductListItem(product, variantsByProduct)),
    });
  } catch (error) {
    next(error);
  }
}

async function getProductBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      throw createError('Product not found', 404);
    }

    const variants = await Variant.find({ productId: product._id }).sort({ createdAt: 1 }).lean();
    const variantIds = variants.map((variant) => variant._id);
    const emiPlans = await EmiPlan.find({ variantId: { $in: variantIds } }).sort({ tenureMonths: 1 }).lean();

    const emiPlansByVariant = new Map();
    for (const plan of emiPlans) {
      const key = String(plan.variantId);
      if (!emiPlansByVariant.has(key)) {
        emiPlansByVariant.set(key, []);
      }
      emiPlansByVariant.get(key).push(plan);
    }

    const enrichedVariants = variants.map((variant) => ({
      ...variant,
      emiPlans: emiPlansByVariant.get(String(variant._id)) || [],
    }));

    res.json({
      success: true,
      data: {
        ...product,
        variants: enrichedVariants,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductBySlug,
};