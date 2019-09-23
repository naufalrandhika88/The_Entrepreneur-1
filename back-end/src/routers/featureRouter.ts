import { Router } from 'express';
import controllers from '../controllers';
import middleware from '../middleware';

const featureController = controllers.feature;
const featureRouter = Router();

featureRouter.post(
  '/edit-profile',
  middleware.multerUploads,
  featureController.editProfile,
);

featureRouter.post(
  '/create-event',
  middleware.multerUploads,
  featureController.createEvent,
);

featureRouter.get('/get-event/:id', featureController.getEvent);
featureRouter.post(
  '/update-event/:id',
  middleware.multerUploads,
  featureController.updateEvent,
);
featureRouter.get('/delete-event/:id', featureController.deleteEvent);

export default featureRouter;
