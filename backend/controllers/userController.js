import asyncHandler from 'express-async-handler'
import generateJWT from '../utils/generateJWT.js'
import validator from 'validator'
import User from '../models/userModel.js'

// @desc    Register a new user and generate new token
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    
    if(!req.body.name || !req.body.email || !req.body.password){
        res.status(400)
        throw new Error('Please fill in all fields.')
    }

    // Validate email
    if(!validator.isEmail(req.body.email)){
        res.status(400)
        throw new Error('Invalid email.')
    }
    
    // Validate password strength
    if(!validator.isStrongPassword(req.body.password, [{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }])){
        res.status(400)
        throw new Error('Password too weak -> min length: 8, min lowercase: 1, min uppercase: 1, min symbols: 1')
    }

    // Check if user exists
    const email = req.body.email
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists.')
    }

    // Set the role based on the email address
    const admin = email === process.env.ADMIN_SECRET ? true : false;

    // Create user
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        admin
    })

    if(user){
        res.status(201).json({
            admin: user.admin,
            token: generateJWT(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate a user by generating new token on login
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            token: generateJWT(user._id)
        })
    } else{
        res.status(401)
        throw new Error('Invalid credentials')
    }
    
})

// @desc    Delete user account
// @route   DELETE /api/users
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
    if(!req.user){
        res.status(404)
        throw new Error('User not found')
    }
    await User.findByIdAndDelete(req.user._id)
    res.status(200).json({message: `Successfully deleted user with _id:${req.user._id}`})
})

// @desc    Update user account
// @route   DELETE /api/users
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
    if(!req.body.email && !req.body.name && !req.body.password){
        res.status(400)
        throw new Error('Please fill in at least one field to update.')
    }

    if(req.body.admin){
        res.status(403)
        throw new Error('Unauthorized action. Admin permission cannot be modified.')
    }
    
    const email = req.body.email
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists.')
    }

    req.user.name = req.body.name || req.user.name
    req.user.email = req.body.email || req.user.email

    if(req.body.password){
        req.user.password = req.body.password
    }

    const updatedUser = await req.user.save()
    res.status(200).json(updatedUser)
    
})

export {
    registerUser, 
    authUser,
    updateUser,
    deleteUser
}