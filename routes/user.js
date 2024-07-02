const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authenticate } = require('../middleware/authService');
const multer = require('multer');
const path = require('path');

const profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile-pics');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const profilePicUpload = multer({ storage: profilePicStorage });

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const videoUpload = multer({
    storage: videoStorage,
    limits: { fileSize: 6 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'video/mp4') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only MP4 is allowed!'));
        }
    }
});

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user', authenticate, userController.getUser);
router.post('/user/bio', authenticate, userController.updateBio);
router.post('/user/avatar', authenticate, profilePicUpload.single('avatar'), userController.uploadAvatar);
router.post('/user/video', authenticate, videoUpload.single('video'), userController.uploadVideo);
router.get('/user/videos', authenticate, userController.getUserVideos1);

// Get all users
router.get('/users', userController.getUsers);

router.get('/user/:userId/videos', userController.getUserVideos);

module.exports = router;
