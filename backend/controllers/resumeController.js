const asyncHandler = require('express-async-handler')

// @desc    Get resume
// @route   Get /api/resume
// @access  Private
const getResume = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get resume'})
})

// @desc    Set resume
// @route   Set /api/resume
// @access  Private
const setResume =  asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Set resume'})
})

// @desc    Update resume
// @route   Pet /api/resume
// @access  Private
const updateResume =  asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update resume ${req.params.id} `})
})

// @desc    Delete resume
// @route   Delete /api/resume
// @access  Private
const deleteResume =  asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete resume ${req.params.id} `})
})


module.exports =  {getResume, setResume, updateResume, deleteResume }