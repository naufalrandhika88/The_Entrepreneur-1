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

featureRouter.post(
  '/create-forum',
  middleware.multerUploads,
  featureController.createForum,
);
featureRouter.get(
  '/get-forum-category/:category',
  featureController.getForumCategory,
);
featureRouter.get('/get-forum/:id', featureController.getForum);
featureRouter.post(
  '/update-forum/:id',
  middleware.multerUploads,
  featureController.updateForum,
);
featureRouter.get('/delete-forum/:id', featureController.deleteForum);

featureRouter.post('/new-ticket', featureController.newTicket);

featureRouter.get('/inbox', featureController.inboxMessage);

export default featureRouter;
