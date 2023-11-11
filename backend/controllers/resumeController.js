const asyncHandler = require('express-async-handler')
const Resume = require('../models/resumeModel')


// @desc    Get resume
// @route   Get /api/resume
// @access  Private
const getResume = asyncHandler(async (req, res) => {
    const resume = await Resume.find()

    res.status(200).json(resume)
})

// @desc    Set resume
// @route   Set /api/resume
// @access  Private
const setResume =  asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please fill the text field.')
    }

    const resume = await Resume.create({
        text: req.body.text
    })

    res.status(200).json(resume)
})

// @desc    Update resume
// @route   Pet /api/resume
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


module.exports =  {getResume, setResume, updateResume, deleteResume }