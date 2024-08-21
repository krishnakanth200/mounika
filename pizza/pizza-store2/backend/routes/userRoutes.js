const express = require('express');
const { 
    registerUser, loginUser, logoutUser, 
    getUserProfile, updateUserProfile, 
    deleteUser, getAllUsers 
} = require('../controllers/userControllers');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
// Add additional routes if necessary

module.exports = router;
