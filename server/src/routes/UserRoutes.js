import { Router } from 'express'
import * as UserController from '../controllers/UserControllers.js' 
import auth from '../middlewares/auth.js'
import upload from '../config/upload.js'

const userRoutes = Router()

userRoutes.post("/signup", UserController.storeUser)

userRoutes.post("/login", UserController.login)

userRoutes.get("/user-letter", auth, UserController.findUsersByLetter)

userRoutes.get("/user/:userId", auth, UserController.findUserById)

userRoutes.post("/user/:userId", auth, upload.single('file'),  UserController.updateUser )


export default userRoutes