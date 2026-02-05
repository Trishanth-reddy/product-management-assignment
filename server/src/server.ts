import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/env.config';
import productRoutes from './routes/product.routes';

const app = express();

app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());

app.use('/api/products', productRoutes);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(config.PORT, () => {
      console.log(`🚀 Server running on port ${config.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB Error:', err));