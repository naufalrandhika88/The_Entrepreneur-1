import {Router} from 'express';
import controllers from '../controllers';

const pageController = controllers.page;
const pageRouter = Router();

pageRouter.get('/home', pageController.home);
pageRouter.get('/profile/', pageController.profile);
pageRouter.get('/profile/:userId', pageController.profile);
pageRouter.get('/detail/:postId', pageController.detail);

export default pageRouter;
