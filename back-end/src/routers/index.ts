import { Router } from 'express';

import pageRouter from './pageRouter';
import featureRouter from './featureRouter';
import authRouter from './authRouter';
import controllers from '../controllers';
import middleware from '../middleware';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/page', middleware.checkToken, pageRouter);
apiRouter.use('/feature', middleware.checkToken, featureRouter);
apiRouter.all('*', controllers.error.getBadPath);

export default apiRouter;
