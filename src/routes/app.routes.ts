import { Request, Response, Router } from 'express';
import NotificationsController from '../controllers/notifications.controller';

const appRouter = Router();

appRouter.get('/', (req: Request, res: Response) => {
  return res.send('App works!');
});

appRouter.post('/notify', NotificationsController.postNotify);

export default appRouter;
