const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const redis = require('redis');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  // Set up Redis client
const redisClient = redis.createClient({
  url: 'redis://127.0.0.1:6379',  // Redis server address
});

// Connect to Redis
redisClient.connect().then(() => {
  console.log('Redis connected');
}).catch((err) => {
  console.error('Redis connection error:', err);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
