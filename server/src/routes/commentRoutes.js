import { Router } from 'express'
import * as CommentController from '../controllers/CommentController.js' 
import auth from '../middlewares/auth.js'

const commentRoutes = Router()

commentRoutes.get('/comment/:taskId', auth, CommentController.ListComments)

commentRoutes.post('/comment/:taskId', auth, CommentController.CreateComment)

commentRoutes.put('/comment/:commentId', auth, CommentController.UpdateComment)

commentRoutes.delete('/comment/:commentId', auth, CommentController.deleteComment)


export default commentRoutes