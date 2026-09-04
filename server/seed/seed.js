require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('../models/Product');
const Variant = require('../models/Variant');
const EmiPlan = require('../models/EmiPlan');
const PlanSelection = require('../models/PlanSelection');
const connectDb = require('../config/db');
const calculateEmi = require('../utils/calculateEmi');

function buildPlans(principal, cashbackAmount, interestRates, processingFee, providerName) {
  const tenures = [3, 6, 12, 24];
  return tenures.map((tenureMonths, index) => {
    const interestRate = interestRates[index];
    return {
      tenureMonths,
      interestRate,
      monthlyAmount: calculateEmi(principal, interestRate, tenureMonths),
      cashbackAmount,
      processingFee,
      providerName,
      isMutualFundBacked: true,
    };
  });
}

function buildVariant({ color, storage, finish, imageUrl, mrp, sellingPrice, stock, cashbackAmount, processingFee, interestRates }) {
  return {
    color,
    storage,
    finish,
    imageUrl,
    mrp,
    sellingPrice,
    stock,
    plans: buildPlans(sellingPrice, cashbackAmount, interestRates, processingFee, 'Demo Mutual Fund Partner'),
  };
}

async function seed() {
  await connectDb();

  await Promise.all([
    PlanSelection.deleteMany({}),
    EmiPlan.deleteMany({}),
    Variant.deleteMany({}),
    Product.deleteMany({}),
  ]);

  const catalog = [
    {
      name: 'Apple iPhone 17 Pro',
      slug: 'iphone-17-pro',
      brand: 'Apple',
      description: 'A premium demo smartphone with advanced display, performance, and camera features for EMI-based checkout flows.',
      category: 'Smartphones',
      variants: [
        buildVariant({
          color: 'Silver',
          storage: '256 GB',
          finish: 'Natural',
          imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
          mrp: 134900,
          sellingPrice: 127400,
          stock: 10,
          cashbackAmount: 7500,
          processingFee: 0,
          interestRates: [0, 0, 0, 10.5],
        }),
        buildVariant({
          color: 'Orange',
          storage: '512 GB',
          finish: 'Desert',
          imageUrl: 'https://images.unsplash.com/photo-1529603996084-04434fcd8c80?auto=format&fit=crop&w=900&q=80',
          mrp: 154900,
          sellingPrice: 145900,
          stock: 7,
          cashbackAmount: 8000,
          processingFee: 199,
          interestRates: [0, 0, 10.5, 10.5],
        }),
      ],
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      brand: 'Samsung',
      description: 'A flagship demo smartphone with stylus support, large display, and premium finishes for responsive product experiences.',
      category: 'Smartphones',
      variants: [
        buildVariant({
          color: 'Titanium Gray',
          storage: '256 GB',
          finish: 'Titanium',
          imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80',
          mrp: 129999,
          sellingPrice: 121999,
          stock: 12,
          cashbackAmount: 7000,
          processingFee: 0,
          interestRates: [0, 0, 0, 10.5],
        }),
        buildVariant({
          color: 'Titanium Black',
          storage: '512 GB',
          finish: 'Titanium',
          imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80',
          mrp: 149999,
          sellingPrice: 139999,
          stock: 8,
          cashbackAmount: 8500,
          processingFee: 249,
          interestRates: [0, 0, 10.5, 10.5],
        }),
      ],
    },
    {
      name: 'OnePlus 13',
      slug: 'oneplus-13',
      brand: 'OnePlus',
      description: 'A fast-charging demo smartphone with polished design and competitive pricing, backed by sample EMI plans.',
      category: 'Smartphones',
      variants: [
        buildVariant({
          color: 'Black',
          storage: '256 GB',
          finish: 'Matte',
          imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
          mrp: 74999,
          sellingPrice: 69999,
          stock: 16,
          cashbackAmount: 4000,
          processingFee: 0,
          interestRates: [0, 0, 0, 10.5],
        }),
        buildVariant({
          color: 'Blue',
          storage: '512 GB',
          finish: 'Gloss',
          imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
          mrp: 84999,
          sellingPrice: 79999,
          stock: 9,
          cashbackAmount: 4500,
          processingFee: 149,
          interestRates: [0, 0, 10.5, 10.5],
        }),
      ],
    },
    {
      name: 'Dell XPS 14',
      slug: 'dell-xps-14',
      brand: 'Dell',
      description: 'A sleek demo laptop with premium materials, focused on category filtering and EMI plan display.',
      category: 'Laptops',
      variants: [
        buildVariant({
          color: 'Platinum',
          storage: '16 GB / 512 GB',
          finish: 'Metal',
          imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
          mrp: 189900,
          sellingPrice: 179900,
          stock: 5,
          cashbackAmount: 9000,
          processingFee: 299,
          interestRates: [0, 0, 10.5, 10.5],
        }),
        buildVariant({
          color: 'Graphite',
          storage: '32 GB / 1 TB',
          finish: 'Metal',
          imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
          mrp: 219900,
          sellingPrice: 208900,
          stock: 4,
          cashbackAmount: 12000,
          processingFee: 399,
          interestRates: [0, 0, 10.5, 10.5],
        }),
      ],
    },
    {
      name: 'iPad Air Pro 13',
      slug: 'ipad-air-pro-13',
      brand: 'Apple',
      description: 'A large-screen demo tablet with versatile connectivity and premium styling for category-based navigation tests.',
      category: 'Tablets',
      variants: [
        buildVariant({
          color: 'Sky Blue',
          storage: '256 GB',
          finish: 'Aluminum',
          imageUrl: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=900&q=80',
          mrp: 89900,
          sellingPrice: 84900,
          stock: 11,
          cashbackAmount: 5000,
          processingFee: 99,
          interestRates: [0, 0, 0, 10.5],
        }),
        buildVariant({
          color: 'Space Gray',
          storage: '512 GB',
          finish: 'Aluminum',
          imageUrl: 'https://images.unsplash.com/photo-1512499617640-c2f999098c2d?auto=format&fit=crop&w=900&q=80',
          mrp: 109900,
          sellingPrice: 103900,
          stock: 6,
          cashbackAmount: 6500,
          processingFee: 149,
          interestRates: [0, 0, 10.5, 10.5],
        }),
      ],
    },
    {
      name: 'Sony Bravia X90L',
      slug: 'sony-bravia-x90l',
      brand: 'Sony',
      description: 'A 55-inch demo television designed to exercise category filtering and product data rendering.',
      category: 'TVs',
      variants: [
        buildVariant({
          color: 'Black',
          storage: '55 inch',
          finish: 'Gloss',
          imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=80',
          mrp: 119900,
          sellingPrice: 113900,
          stock: 7,
          cashbackAmount: 6000,
          processingFee: 199,
          interestRates: [0, 0, 0, 10.5],
        }),
        buildVariant({
          color: 'Charcoal',
          storage: '65 inch',
          finish: 'Gloss',
          imageUrl: 'https://images.unsplash.com/photo-1571414195787-1f38c6ba0b8a?auto=format&fit=crop&w=900&q=80',
          mrp: 159900,
          sellingPrice: 151900,
          stock: 3,
          cashbackAmount: 8000,
          processingFee: 249,
          interestRates: [0, 0, 10.5, 10.5],
        }),
      ],
    },
    {
      name: 'Bose QuietComfort Ultra',
      slug: 'bose-quietcomfort-ultra',
      brand: 'Bose',
      description: 'A premium audio demo product for the audio category, with multiple EMI plans and responsive UI coverage.',
      category: 'Audio',
      variants: [
        buildVariant({
          color: 'Black',
          storage: 'Headphones',
          finish: 'Soft-touch',
          imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
          mrp: 32900,
          sellingPrice: 29900,
          stock: 15,
          cashbackAmount: 1500,
          processingFee: 49,
          interestRates: [0, 0, 0, 10.5],
        }),
        buildVariant({
          color: 'White',
          storage: 'Headphones',
          finish: 'Soft-touch',
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
          mrp: 34900,
          sellingPrice: 31900,
          stock: 14,
          cashbackAmount: 1800,
          processingFee: 59,
          interestRates: [0, 0, 10.5, 10.5],
        }),
      ],
    },
  ];

  const products = await Product.insertMany(
    catalog.map(({ variants, ...product }) => product)
  );

  const productMap = new Map(products.map((product) => [product.slug, product]));

  const variants = [];
  const emiDocs = [];

  for (const product of catalog) {
    const insertedProduct = productMap.get(product.slug);

    for (const variantInput of product.variants) {
      const [variant] = await Variant.create([
        {
          productId: insertedProduct._id,
          color: variantInput.color,
          storage: variantInput.storage,
          finish: variantInput.finish,
          imageUrl: variantInput.imageUrl,
          mrp: variantInput.mrp,
          sellingPrice: variantInput.sellingPrice,
          stock: variantInput.stock,
        },
      ]);

      variants.push(variant);

      for (const plan of variantInput.plans) {
        emiDocs.push({
          variantId: variant._id,
          tenureMonths: plan.tenureMonths,
          monthlyAmount: plan.monthlyAmount,
          interestRate: plan.interestRate,
          cashbackAmount: plan.cashbackAmount,
          processingFee: plan.processingFee,
          providerName: plan.providerName,
          isMutualFundBacked: plan.isMutualFundBacked,
        });
      }
    }
  }

  await EmiPlan.insertMany(emiDocs);

  console.log('Database seeded successfully.');
  console.log(`Products: ${products.length}`);
  console.log(`Variants: ${variants.length}`);
  console.log(`EMI Plans: ${emiDocs.length}`);
}

seed()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });