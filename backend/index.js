import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => res.send('Server is working ✅'));

// Routes
app.use('/api', authRoutes);
app.use('/api', foodRoutes);
app.use('/api', orderRoutes);
app.use('/api', customerRoutes);
app.use('/api', employeeRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Atlas connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => console.error('MongoDB connection error:', error));
