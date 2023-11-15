const asyncHandler = require('express-async-handler')
const Resume = require('../models/resumeModel')


// @desc    Get whole resume
// @route   Get /api/resume
// @access  Private
const getResume = asyncHandler(async (req, res) => {
    const resume = await Resume.find()

    res.status(200).json(resume)
})

// @desc    Get contact section of the resume
// @route   GET /api/resume/contact
// @access  Private
const getConctact = asyncHandler(async (req, res) => {
    const contact = await Resume.find({}, 'contact')

    res.status(200).json(contact)
})

// @desc    Get skills section of the resume
// @route   GET /api/resume/skills
// @access  Private
const getSkills = asyncHandler(async (req, res) => {
    const skills = await Resume.find({}, 'skills')

    res.status(200).json(skills)
})

// @desc    Get education section of the resume
// @route   GET /api/resume/education
// @access  Private
const getEducation = asyncHandler(async (req, res) => {
    const education = await Resume.find({}, 'education')

    res.status(200).json(education)
})

// @desc    Get experience section of the resume
// @route   GET /api/resume/experience
// @access  Private
const getExperience = asyncHandler(async (req, res) => {
    const experience = await Resume.find({}, 'experience')

    res.status(200).json(experience)
})

// @desc    Get projects section of the resume
// @route   GET /api/resume/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Resume.find({}, 'projects')

    res.status(200).json(projects)
})

// @desc    Get weaknesses (easter egg)
// @route   GET /api/resume/weaknesses
// @access  Private
const getWeaknesses = asyncHandler(async (req, res) => {
    res.status(500)
    throw new Error('Error: No weaknesses to be found!')
})

// @desc    Set whole resume
// @route   Set /api/resume
// @access  Private (Admin Only)
const setResume =  asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    if(!req.body.resume){
        res.status(400)
        throw new Error('Please fill all resume fields.')
    }

    const resume = await Resume.create({
        resume: req.body.resume
    })

    res.status(200).json(resume)
})


// @desc    Set contact section of the resume
// @route   POST /api/resume/contact
// @access  Private (Admin Only)
const setConctact = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }
    
    if (!req.body.contact) {
        res.status(400)
        throw new Error('Please fill all contact fields.')
    }

    const contact = await Resume.create({ contact: req.body.contact })

    res.status(200).json(contact)
})

// @desc    Set skills section of the resume
// @route   POST /api/resume/skills
// @access  Private (Admin Only)
const setSkills = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }
    
    if (!req.body.skills) {
        res.status(400)
        throw new Error('Please fill all skill fields.')
    }

    const skills = await Resume.create({ skills: req.body.skills })

    res.status(200).json(skills)
})

// @desc    Set education section of the resume
// @route   POST /api/resume/education
// @access  Private (Admin Only)
const setEducation = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }
    
    if (!req.body.education) {
        res.status(400)
        throw new Error('Please fill all education fields.')
    }

    const education = await Resume.create({ education: req.body.education })

    res.status(200).json(education)
})

// @desc    Set experience section of the resume
// @route   POST /api/resume/experience
// @access  Private (Admin Only)
const setExperience = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }

    if (!req.body.experience) {
        res.status(400)
        throw new Error('Please fill all experience fields.')
    }

    const experience = await Resume.create({ experience: req.body.experience })

    res.status(200).json(experience)
})

// @desc    Set projects section of the resume
// @route   POST /api/resume/projects
// @access  Private (Admin Only)
const setProjects = asyncHandler(async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(403)
        throw new Error('Not authorized, admin permission only.')
    }
    
    if (!req.body.projects) {
        res.status(400)
        throw new Error('Please fill all project fields.')
    }
n
    const projects = await Resume.create({ projects: req.body.projects })

    res.status(200).json(projects)
})



// @desc    Update resume
// @route   Put /api/resume
// @access  Private
const updateResume =  asyncHandler(async (req, res) => {
    const resume = await Resume.findById(req.params.id)

    if(!resume){
        res.status(400)
        throw new Error('Resume not found.')
    }

    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedResume)
})

// @desc    Delete resume
// @route   Delete /api/resume
// @access  Private
const deleteResume =  asyncHandler(async (req, res) => {
    const resume = await Resume.findById(req.params.id)

    if(!resume){
        res.status(400)
        throw new Error('Resume not found.')
    }

    await Resume.remove()

    res.status(200).json({id: req.params.id})
})


module.exports =  {getResume, getConctact, getSkills, getEducation, getExperience, getProjects, getWeaknesses, setResume, setConctact, setSkills, setEducation, setExperience, setProjects,  updateResume, deleteResume }