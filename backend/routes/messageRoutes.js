const express = require('express')
const router = express.Router()
const { 
    getMessage, 
    setMessage, 
    getAllMessage 
} = require('../controllers/messageController')
const { protect } = require('../middleware/authMiddleware')


// @desc    User route
// @access  Private
router.get('/', protect, getMessage)
router.post('/', protect, setMessage)

// @desc    Admin route
// @access  Private
router.get('/', protect, getAllMessage)

//router.put('/:id', protect, updateMessage)

//router.delete('/:id', protect, deleteMessage)

module.exports = router