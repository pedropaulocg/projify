import { Router } from 'express'
import userRoutes from './UserRoutes.js';
import projectsRoutes from './projectRoutes.js';

const routes = Router();

routes.use(userRoutes)
routes.use(projectsRoutes)


export default routes