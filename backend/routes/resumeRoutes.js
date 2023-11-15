const express = require('express')
const router = express.Router()
const { 
    getResume, 
    getConctact, 
    getSkills, 
    getEducation, 
    getExperience, 
    getProjects, 
    setResume,
    setConctact,
    setSkills,
    setEducation,
    setExperience,
    setProjects, 
    updateResume, 
    deleteResume,
    getWeaknesses 
} = require('../controllers/resumeController')
const { protect } = require('../middleware/authMiddleware')

// Whole resume
router.get('/', protect, getResume)

// Specific sections
router.get('/contact', protect, getConctact)
router.get('/skills', protect, getSkills)
router.get('/education', protect, getEducation)
router.get('/experience', protect, getExperience)
router.get('/projects', protect, getProjects)

// Easter egg, getWeaknesses = status 500
router.get('/weaknesses', protect, getWeaknesses)

// Whole resume
router.post('/', protect, setResume)

// Specific sections
router.post('/contact', protect, setConctact)
router.post('/skills', protect, setSkills)
router.post('/education', protect, setEducation)
router.post('/experience', protect, setExperience)
router.post('/projects', protect, setProjects)
router.put('/:id', protect, updateResume)
router.delete('/:id', protect, deleteResume)

module.exports = router