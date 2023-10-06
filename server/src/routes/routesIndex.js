import { Router } from 'express'
import userRoutes from './UserRoutes.js';
import projectsRoutes from './projectRoutes.js';
import boardRoutes from './boardRoutes.js';
import taskRoutes from './taskRoutes.js';
import commentRoutes from './commentRoutes.js';

const routes = Router();

routes.use(userRoutes)
routes.use(projectsRoutes)
routes.use(boardRoutes)
routes.use(taskRoutes)
routes.use(commentRoutes)


export default routes