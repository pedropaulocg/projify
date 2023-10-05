import { Router } from 'express'
import * as BoardController from '../controllers/BoardController.js' 
import auth from '../middlewares/auth.js'

const boardRoutes = Router()

boardRoutes.get('/board/:projectId', auth, BoardController.listBoards)

boardRoutes.post('/board/:projectId', auth, BoardController.storeBoard)

boardRoutes.put('/board/:boardId', auth, BoardController.updateBoard)

boardRoutes.delete('/board/:boardId', auth, BoardController.deleteBoard)


export default boardRoutes