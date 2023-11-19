import express from 'express'
const router = express.Router()
import { 
    deleteComment,
    getComments, 
    setComment,
    updateComment
} from'../controllers/commentController.js'
import { protect } from '../middleware/authMiddleware.js'


// @GET regular user fetches their own comments, admin fetches all comments
router.get('/', protect, getComments)

// @POST Set new comment
router.post('/', protect, setComment)

// @PUT Updates a message
router.put('/:id', protect, updateComment)

// @DELETE Delete a message
router.delete('/:id', protect, deleteComment)

export default router