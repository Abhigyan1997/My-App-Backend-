const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Register a new user
exports.register = async ({ firstName, lastName, email, phoneNumber }) => {
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword
    });

    await newUser.save();
    return { message: 'User registered successfully', password };
};

exports.login = async ({ fullName, password }) => {
    try {
        const [firstName, lastName] = fullName.split(' ');

        const user = await User.findOne({ firstName, lastName });
        if (!user) {
            throw new Error('User not found'); // Custom error message for user not found
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Password incorrect'); // Custom error message for incorrect password
        }

        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
        return { message: 'Login successful', token };
    } catch (error) {
        throw error; // Rethrow the error to be caught by the caller
    }
};
// Get user details
exports.getUser = async (userId) => {
    const user = await User.findById(userId).select('-password');
    return user;
};

// Update bio
exports.updateBio = async (userId, bio) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    user.bio = bio;
    await user.save();
    return { message: 'Bio updated successfully' };
};

exports.uploadAvatar = async (userId, filename) => {
    try {
        // Update the user's avatar field in the database
        const updatedUser = await User.findByIdAndUpdate(userId, { avatar: filename }, { new: true });

        if (!updatedUser) {
            throw new Error('User not found'); // Handle case where user is not found
        }

        return updatedUser;
    } catch (err) {
        console.error('Error in userService.uploadAvatar:', err);
        throw err; // Propagate the error to the controller for handling
    }
};
// Upload video
exports.uploadVideo = async (userId, { title, description }, path) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const newVideo = {
        title,
        description,
        path
    };

    user.videos.push(newVideo);
    await user.save();
    return { message: 'Video uploaded successfully' };
};

// Get user videos
exports.getUserVideos = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user.videos;
};



// Fetch all users
exports.getAllUsers = async () => {
    try {
      const users = await User.find().populate('videos');
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  exports.getUserAllVideos = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user.videos;
    } catch (error) {
        throw new Error(error.message);
    }
};