const userService = require('../services/user');

// Register a new user
exports.register = async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get user details
exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Update bio
exports.updateBio = async (req, res) => {
    try {
        const result = await userService.updateBio(req.user, req.body.bio);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Upload avatar
exports.uploadAvatar = async (req, res) => {
    try {
        // Assuming req.user contains the authenticated user's ID
        const result = await userService.uploadAvatar(req.user, req.file.filename);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error uploading avatar:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};
// Upload video
exports.uploadVideo = async (req, res) => {
    try {
        const result = await userService.uploadVideo(req.user, req.body, req.file.path);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// Get user videos
exports.getUserVideos1 = async (req, res) => {
    try {
        const videos = await userService.getUserVideos(req.user);
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};



// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Fetch all videos of a user by userId
exports.getUserVideos = async (req, res) => {
    const { userId } = req.params;
    try {
        const videos = await userService.getUserAllVideos(userId);
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

