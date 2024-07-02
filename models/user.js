const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    bio: String,
    avatar: String,
    videos: [
        {
            title: String,
            description: String,
            path: String
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
