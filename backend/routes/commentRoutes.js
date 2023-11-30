import express from 'express'
const router = express.Router()
import { 
    deleteComment,
    getComments, 
    setComment
} from'../controllers/commentController.js'
import { protect } from '../middleware/authMiddleware.js'


// @GET regular user fetches their own comments, admin fetches all comments
router.get('/', protect, getComments)

// @POST Set new comment
router.post('/', protect, setComment)

// @DELETE Delete a message
router.delete('/:id', protect, deleteComment)

export default router