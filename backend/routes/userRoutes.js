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

router.post('/', registerUser)
router.post('/login', authUser)
router.put('/', protect, updateUser)
router.delete('/', protect, deleteUser)

export default router