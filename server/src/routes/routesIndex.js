import { Router } from 'express'
import userRoutes from './UserRoutes.js';
import projectsRoutes from './projectRoutes.js';
import boardRoutes from './boardRoutes.js';

const routes = Router();

routes.use(userRoutes)
routes.use(projectsRoutes)
routes.use(boardRoutes)


export default routes