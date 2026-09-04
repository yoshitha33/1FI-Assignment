const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const productRoutes = require('./routes/productRoutes');
const emiRoutes = require('./routes/emiRoutes');
const planSelectionRoutes = require('./routes/planSelectionRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'https://localhost:5173',
]
  .filter(Boolean)
  .flatMap((value) => value.split(',').map((item) => item.trim()).filter(Boolean));

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'EMI Marketplace API is running',
  });
});

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