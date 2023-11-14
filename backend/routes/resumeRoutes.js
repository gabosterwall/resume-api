const express = require('express')
const router = express.Router()
const { getResume, setResume, updateResume, deleteResume } = require('../controllers/resumeController')
const { protect } = require('../middleware/authMiddleware')

// @desc    User routes
// @access  Public

// Whole resume
router.get('/', getResume)
// Specific sections
//router.get('/education', getEducation)
//router.get('/experience', getEducation)
//router.get('/skills', getEducation)
//router.get('/projects', getEducation)
// Easter egg, getWeaknesses = throw new Error()
//router.get('/weaknesses', getWeaknesses)

// @desc    Admin routes
// @access  Private
router.post('/', protect, setResume)

router.put('/:id', protect, updateResume)

router.delete('/:id', protect, deleteResume)

module.exports = router