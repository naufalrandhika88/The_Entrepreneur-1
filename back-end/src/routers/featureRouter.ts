import {Router} from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const featureController = controllers.feature;
const featureRouter = Router();

featureRouter.get('/like/:postId', featureController.like);
featureRouter.get('/search/:userInput', featureController.search);
featureRouter.post(
  '/add-post',
  middleware.multerUploads,
  featureController.addPost,
);
featureRouter.get('/follow/:userId', featureController.follow);
featureRouter.post(
  '/edit-profile',
  middleware.multerUploads,
  featureController.editProfile,
);

export default featureRouter;
