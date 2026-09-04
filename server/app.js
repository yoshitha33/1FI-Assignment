const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const productRoutes = require('./routes/productRoutes');
const emiRoutes = require('./routes/emiRoutes');
const planSelectionRoutes = require('./routes/planSelectionRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL] : true,
    credentials: true,
  })
);
app.use(helmet());

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
  });
});

app.use('/api/products', productRoutes);
app.use('/api/emi', emiRoutes);
app.use('/api/plan-selections', planSelectionRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;