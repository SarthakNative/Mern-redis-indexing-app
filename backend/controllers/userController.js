const User = require('../models/User');
const redisClient = require('../redisClient'); 

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check Redis for cached user data
    const cachedUser = await redisClient.get(userId);

    if (cachedUser) {
      console.log('User fetched from Redis cache');
      return res.status(200).json(JSON.parse(cachedUser));  // Return cached data
    }

    // If not in Redis, fetch from MongoDB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Save the fetched user in Redis for future requests
    await redisClient.set(userId, JSON.stringify(user), {
      EX: 3600  // Expiration time in seconds (1 hour)
    });

    console.log('User fetched from MongoDB and cached in Redis');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



module.exports = { getUsers, createUser ,getUserById};
