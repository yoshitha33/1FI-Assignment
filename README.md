# EMI Marketplace

## Project Overview

EMI Marketplace is a demo e-commerce-style smartphone application built with a React frontend, an Express.js API, and MongoDB with Mongoose. The app loads products, product variants, product images, prices, stock, and EMI plans from MongoDB and lets a user select a variant and an EMI plan before submitting that selection to the backend.

**Disclaimer:** This is an educational/demo application. No real loan, mutual fund investment, payment, or financial transaction is processed.

## Features

- Dynamic product listing from MongoDB
- Product variants loaded from MongoDB
- Dynamic product images
- Dynamic pricing and discount display
- Multiple EMI plans per variant
- Mutual-fund-backed EMI information
- EMI plan selection and persistence in MongoDB
- Express REST API
- Responsive React UI with Tailwind CSS
- Loading and error states
- Centralized backend error handling

## Tech Stack

Frontend:
- React
- JavaScript
- Tailwind CSS
- React Router

Backend:
- Node.js
- Express.js
- JavaScript

Database:
- MongoDB
- Mongoose

Deployment:
- Vercel
- Render
- MongoDB Atlas

## Project Structure

```text
project-root/
  client/
    src/
      components/
      pages/
      services/
      App.jsx
      main.jsx
    public/
    package.json
    vite.config.js
  server/
    controllers/
    models/
    routes/
    middleware/
    config/
    utils/
    seed/
    app.js
    server.js
    package.json
  README.md
  .gitignore
  .env.example
```

## MongoDB Schema

Product -> Variant -> EMI Plan

PlanSelection stores the chosen variant and EMI plan.

### Product

Fields:
- name
- slug
- brand
- description
- category
- createdAt
- updatedAt

### Variant

Fields:
- productId
- color
- storage
- finish
- imageUrl
- mrp
- sellingPrice
- stock
- createdAt
- updatedAt

### EmiPlan

Fields:
- variantId
- tenureMonths
- monthlyAmount
- interestRate
- cashbackAmount
- processingFee
- providerName
- isMutualFundBacked
- createdAt
- updatedAt

### PlanSelection

Fields:
- variantId
- emiPlanId
- createdAt
- updatedAt

## Installation

### Backend

```bash
cd server
npm install
```

Create a `.env` file from `.env.example`.

```bash
npm run seed
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create a `.env` file from `.env.example`.

```bash
npm run dev
```

## Environment Variables

### server/.env

```env
MONGO_URI=mongodb+srv://<db_username>:<db_password>@electprod.sawtper.mongodb.net/emi-marketplace?appName=electprod
PORT=5000
CLIENT_URL=http://localhost:5173
```

### client/.env

```env
VITE_API_URL=http://localhost:5000/api
```

## API Documentation

### GET /api/health

Description: Checks whether the API is running.

Example response:

```json
{
  "success": true,
  "message": "API is running"
}
```

### GET /api/products

Description: Returns all products.

Example response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Apple iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "category": "Smartphones",
      "imageUrl": "...",
      "startingPrice": 127400
    }
  ]
}
```

### GET /api/products/:slug

Description: Returns a single product with its variants and EMI plans.

Example response:

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "description": "...",
    "category": "Smartphones",
    "variants": [
      {
        "_id": "...",
        "color": "Silver",
        "storage": "256 GB",
        "finish": "Natural",
        "imageUrl": "...",
        "mrp": 134900,
        "sellingPrice": 127400,
        "stock": 10,
        "emiPlans": [
          {
            "_id": "...",
            "tenureMonths": 6,
            "monthlyAmount": 22483,
            "interestRate": 0,
            "cashbackAmount": 7500,
            "processingFee": 0,
            "providerName": "Demo Mutual Fund Partner",
            "isMutualFundBacked": true
          }
        ]
      }
    ]
  }
}
```

### GET /api/products/:slug/variants/:variantId

Description: Returns one selected variant and its EMI plans.

Example response:

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "productId": "...",
    "color": "Silver",
    "storage": "256 GB",
    "finish": "Natural",
    "imageUrl": "...",
    "mrp": 134900,
    "sellingPrice": 127400,
    "stock": 10,
    "emiPlans": [
      {
        "_id": "...",
        "tenureMonths": 6,
        "monthlyAmount": 22483,
        "interestRate": 0,
        "cashbackAmount": 7500,
        "processingFee": 0,
        "providerName": "Demo Mutual Fund Partner",
        "isMutualFundBacked": true
      }
    ]
  }
}
```

### POST /api/plan-selections

Description: Stores a selected variant and EMI plan.

Request body:

```json
{
  "variantId": "...",
  "emiPlanId": "..."
}
```

Example response:

```json
{
  "success": true,
  "message": "EMI plan selected successfully",
  "data": {
    "selectionId": "..."
  }
}
```

Example error response:

```json
{
  "success": false,
  "error": {
    "message": "Product not found"
  }
}
```

## Deployment

### MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create the `emi-marketplace` database.
3. Copy the connection string.
4. Add it to Render as `MONGO_URI`.

### Render Backend

- Deploy the `server` folder.
- Set the start command to `npm start`.
- Set the build command if needed by your Render setup.
- Add environment variables:
  - `MONGO_URI`
  - `CLIENT_URL`
  - `PORT`

### Vercel Frontend

- Deploy the `client` folder.
- Add:

```env
VITE_API_URL=https://your-render-backend-url/api
```

Make sure the Render backend CORS configuration allows the Vercel frontend origin.

## Verification Checklist

- JavaScript only
- No TypeScript
- React frontend works
- Tailwind CSS works
- Express backend works
- MongoDB connection works
- Mongoose models work
- Seed script works
- 3+ products
- 2+ variants per product
- 4+ EMI plans per variant
- Product data comes from MongoDB
- Variant data comes from MongoDB
- Image URLs come from MongoDB
- Prices come from MongoDB
- EMI plans come from MongoDB
- GET /api/products works
- GET /api/products/:slug works
- Variant switching works
- EMI selection works
- POST /api/plan-selections works
- Validation works
- Error handling works
- Loading states work
- Responsive design works
- README is complete
- .env.example exists
- .gitignore exists
- Deployment instructions exist

## Submission Links

Live Demo: [Add Vercel URL]

GitHub Repository: [Add GitHub URL]

Video Demo: [Add Google Drive/YouTube URL]
