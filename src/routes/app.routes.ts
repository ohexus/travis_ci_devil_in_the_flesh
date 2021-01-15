import { Router } from 'express';
import NotificationsController from '../controllers/notifications.controller';

const appRouter = Router();

appRouter.post('/notify', NotificationsController.postNotify);

export default appRouter;
