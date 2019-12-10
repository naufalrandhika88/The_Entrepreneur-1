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
featureRouter.get('/get-forums', featureController.getAllForums);
featureRouter.get('/get-forum/:id', featureController.getForum);
featureRouter.post(
  '/update-forum/:id',
  middleware.multerUploads,
  featureController.updateForum,
);
featureRouter.get('/delete-forum/:id', featureController.deleteForum);
featureRouter.get('/likes-forum/:id', featureController.likesForum);

featureRouter.post('/add-comment', featureController.newComments);
featureRouter.post('/edit-comment/:id', featureController.editComments);
featureRouter.get('/get-comment/:id', featureController.getComments);
featureRouter.get('/likes-comment/:id', featureController.likesComment);

featureRouter.post('/new-ticket', featureController.newTicket);
featureRouter.get('/get-ticket', featureController.getTicketById);

featureRouter.get('/inbox', featureController.inboxMessage);
featureRouter.get('/delete-inbox/:id', featureController.deleteInbox);

export default featureRouter;
