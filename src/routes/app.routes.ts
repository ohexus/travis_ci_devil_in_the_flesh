import { Router } from 'express';
import NotificationsController from '../controllers/notifications.controller';

const appRouter = Router();

appRouter.use('/notify', NotificationsController.postNotify);

export default appRouter;
