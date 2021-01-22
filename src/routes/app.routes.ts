import { Request, Response, Router } from 'express';
import { NotificationsController, SecretController } from '../controllers';

const appRouter = Router();

appRouter.get('/', (req: Request, res: Response) => {
  return res.send('App works!');
});

appRouter.post('/notify', NotificationsController.postNotify);

appRouter.post('/secret', SecretController.postSecret);

export default appRouter;
