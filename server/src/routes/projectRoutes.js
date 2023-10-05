import { Router } from 'express'
import * as ProjectController from '../controllers/ProjectController.js' 
import auth from '../middlewares/auth.js'
import upload from '../config/upload.js'

const projectsRoutes = Router()
projectsRoutes.post('/project', auth, upload.single("file"), ProjectController.storeProject)

projectsRoutes.get('/project', auth, ProjectController.listProjects)

projectsRoutes.get('/project-name', auth, ProjectController.findProjectByName)

projectsRoutes.get('/project-users/:projectId', auth, ProjectController.listProjectParticipants)

projectsRoutes.get('/project/:projectId', auth, ProjectController.findProjectById)

projectsRoutes.put('/project/:projectId', auth, upload.single('file'),ProjectController.editProject)

projectsRoutes.put('/project-leave/:projectId', auth, ProjectController.leaveProject)

projectsRoutes.put('/project-status/:projectId', auth, ProjectController.deactivateProject)

export default projectsRoutes