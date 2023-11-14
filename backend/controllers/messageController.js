const asyncHandler = require('express-async-handler')
const Message = require('../models/messageModel')
//const User = require('../models/userModel')


// @desc    Get (own) message(s)
// @route   Get /api/messages
// @access  Private
const getMessage = asyncHandler(async (req, res) => {
    const message = await Message.find({ user: req.user.id})

    res.status(200).json(message)
})

// @desc    Set message
// @route   Set /api/messages
// @access  Private
const setMessage =  asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text value.')
    }

    const message = await Message.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(message)
})

// @desc    Update message
// @route   Put /api/messages
// @access  Private
const updateMessage =  asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id)

    if(!message){
        res.status(400)
        throw new Error('Message not found.')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found.')
    }

    // Validate that the logged in user matches the message's user
    if(message.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized.')
    }

    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedMessage)
})

// @desc    Delete message
// @route   Delete /api/messages
// @access  Private
const deleteMessage =  asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id)

    if(!message){
        res.status(400)
        throw new Error('Message not found.')
    }

    if(!req.user){
        res.status(401)
        throw new Error('User not found.')
    }

    // Validate that the logged in user matches the message's user
    if(message.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized.')
    }

    await Message.remove()

    res.status(200).json({id: req.params.id})
})


module.exports =  {getMessage, setMessage, updateMessage, deleteMessage }