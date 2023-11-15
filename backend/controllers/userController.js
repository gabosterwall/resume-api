const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please fill in all fields.')
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists.')
    }

    // Set the role based on the email address
    const role = email === process.env.ADMIN_SECRET ? 'admin' : 'user';

    // Hash password using becrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            token: generateJWT(user._id),
            role: user.role
        })
    } else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get user data
// @route   Get /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// @desc    Update a user
// @route   Put /api/users
// @access  Public
const updateUser =  (req, res) => {
    res.json({message: 'Update user'})
}

// @desc    Delete a user
// @route   POST /api/users
// @access  Public
const deleteUser = (req, res) => {
    res.json({message: 'Delete user'})
}

// Generate JWT
const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = { registerUser, loginUser, getMe}