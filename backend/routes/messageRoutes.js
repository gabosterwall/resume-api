const express = require('express')
const router = express.Router()
const { getMessage, setMessage, updateMessage, deleteMessage } = require('../controllers/messageController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getMessage)

router.post('/', protect, setMessage)

router.put('/:id', protect, updateMessage)

router.delete('/:id', protect, deleteMessage)

module.exports = router