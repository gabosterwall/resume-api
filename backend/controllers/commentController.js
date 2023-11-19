import asyncHandler from 'express-async-handler'
import Comment from '../models/commentModel.js'

// @desc    Regular users gets their own messages, Admin gets all messages
// @route   GET /api/messages
// @access  Private / Admin Only
const getComments = asyncHandler(async (req, res) => {
    if(req.user.role === 'admin'){
        const comment = await Comment.find()
        res.status(200).json(comment)
    }
    else{
        const comment = await Comment.find({ user: req.user.id})
        res.status(200).json(comment)
    }
})

// @desc    Set message
// @route   POST /api/messages
// @access  Private
const setComment =  asyncHandler(async (req, res) => {
    if(!req.user){
        res.status(401)
        throw new Error('User not found.')
    }

    if(!req.body){
        res.status(400)
        throw new Error('Please add a text value.')
    }

    if(req.body.text.length >= 400){
        res.status(400)
        throw new Error('Error, comment cannot exceed 400 characters.')
    }

    const comment = await Comment.create({
        user: req.user.id,
        text: req.body.text
    })

    res.status(200).json(comment)
})

// @desc    Update message
// @route   PUT /api/messages/:id
// @access  Private
const updateComment =  asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Message not found.')
    }

    if(!req.user){
        res.status(404)
        throw new Error('User not found.')
    }

    // Validate that the logged in user matches the message's user
    if(comment.user._id.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized.')
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedComment)
})

// @desc    Delete message
// @route   Delete /api/messages/:id
// @access  Private
const deleteComment =  asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if(!comment){
        res.status(400)
        throw new Error('Message not found.')
    }

    if(!req.user){
        res.status(404)
        throw new Error('User not found.')
    }

    // Validate that the logged in user matches the message's user
    if(comment.user._id.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized.')
    }

    await Comment.findByIdAndDelete(req.params.id)

    res.status(200).json({message: `Successfully deleted comment with _id: ${req.params.id}`})
})


export {
    getComments, 
    setComment,
    updateComment,
    deleteComment
}