import { Router } from 'express'
import * as ProjectController from '../controllers/ProjectController.js' 
import auth from '../middlewares/auth.js'
import upload from '../config/upload.js'

const projectsRoutes = Router()
projectsRoutes.post('/project', auth, upload.single("file"), ProjectController.storeProject)

projectsRoutes.get('/project', auth, ProjectController.listProjects)

projectsRoutes.get('/project-name', auth, ProjectController.findProjectByName)


export default projectsRoutes