//const express = require('express')
import express from 'express'
const router = express.Router()
import { 
    registerUser, 
    authUser,
    deleteUser,
    updateUser, 
} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'

// @POST Register new account
router.post('/', registerUser)

// @POST Login existing user
router.post('/login', authUser)

// @PUT Update user's information
router.put('/', protect, updateUser)

// @DELETE Delete account
router.delete('/', protect, deleteUser)

export default router