import { Router } from 'express';
import controllers from '../controllers';

const pageController = controllers.page;
const pageRouter = Router();

pageRouter.get('/profile', pageController.profile);
pageRouter.get('/home', pageController.home);

export default pageRouter;
