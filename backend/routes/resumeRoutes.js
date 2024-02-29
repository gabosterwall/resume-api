//const express = require('express')
import express from 'express'
const router = express.Router()
import { 
    getResume,
    getSection,
    setResume,
    updateContact,
    updateSkills,
    updateEducation,
    updateExperience,
    updateProjects,
    setNewExperience,
    setNewProject,
    setNewEducation
} from '../controllers/resumeController.js'
import { protect } from'../middleware/authMiddleware.js'

// @GET fetch whole resume
router.get('/', protect, getResume)

// @GET fetch specific sections
router.get('/:id', protect, getSection)

// @POST set whole resume (Admin Only)
router.post('/', protect, setResume)

// @POST set new education, experience or project (Admin Only)
router.post('/education', protect, setNewEducation)
router.post('/experience', protect, setNewExperience)
router.post('/projects', protect, setNewProject)

// @PATCH update resume, only through specific sections (Admin Only)

// router.patch('/:id', protect, updateSection) ---> FIXA KLART

router.patch('/contact', protect, updateContact)
router.patch('/skills', protect, updateSkills)
router.patch('/education/:id', protect, updateEducation)
router.patch('/experience/:id', protect, updateExperience)
router.patch('/projects/:id', protect, updateProjects)


export default router