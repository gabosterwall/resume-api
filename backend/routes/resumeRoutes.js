const express = require('express')
const router = express.Router()
const { getResume, setResume, updateResume, deleteResume } = require('../controllers/resumeController')

router.get('/', getResume)

router.post('/', setResume)

router.put('/:id', updateResume)

router.delete('/:id', deleteResume)

module.exports = router