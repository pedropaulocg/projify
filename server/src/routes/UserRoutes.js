import { Router } from 'express'
import * as UserController from '../controllers/UserControllers.js' 

const userRoutes = Router()

userRoutes.post("/signup", UserController.storeUser)

userRoutes.post("/login", UserController.login)


export default userRoutes