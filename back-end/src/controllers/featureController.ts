import { Request, Response } from 'express';

import userModel from '../models/userModel';
import eventModel from '../models/eventModel';
import ticketModel from '../models/ticketModel';
import forumModel from '../models/forumModel';
import inboxModel from '../models/inboxModel';
import commentModel from '../models/commentModel';
import { ResponseObject } from '../types';
import { SERVER_OK, SERVER_BAD_REQUEST } from '../constants';
import { dataUri } from '../helpers';
import { uploader } from '../cloudinarySetup';

async function editProfile(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { isAvatarChange, full_name, membership, gender } = req.body;
    if (!full_name || !gender) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Please fill all required fields',
      });
      return;
    }

    let user = await userModel.getUserData(decoded);

    if (!user) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'User is not exist',
      });
      return;
    }

    let oldMembershipStatus = user.data.membership;

    if (req.file && isAvatarChange === 'true') {
      const file = dataUri(req).content;
      return uploader
        .upload(file)
        .then(async (db_result: any) => {
          let image = db_result.url;
          let result: ResponseObject = await userModel.updateUser(
            { image, full_name, membership, gender },
            decoded,
          );

          if (result.success) {
            res.status(SERVER_OK).json(result);

            if (oldMembershipStatus === 'Basic' && membership === 'Premium') {
              let { id } = decoded;

              let date = new Date();
              let year = date.getFullYear();
              let month: string | number = date.getMonth() + 1;
              let day: string | number = date.getDate();

              if (day < 10) {
                day = '0' + day;
              }
              if (month < 10) {
                month = '0' + month;
              }

              let today = year + '-' + month + '-' + day;

              await inboxModel.addToInbox(
                id,
                'You are now a premium member!',
                today,
              );
            }
          } else {
            res.status(SERVER_BAD_REQUEST).json(result);
          }
        })
        .catch((err: any) =>
          res.status(SERVER_BAD_REQUEST).json({
            success: false,
            data: {
              err,
            },
            message: 'Someting went wrong while processing your request',
          }),
        );
    } else if (isAvatarChange === 'false') {
      let result: ResponseObject = await userModel.updateUser(
        { image: null, full_name, membership, gender },
        decoded,
      );
      if (result.success) {
        res.status(SERVER_OK).json(result);

        if (oldMembershipStatus === 'Basic' && membership === 'Premium') {
          let { id } = decoded;

          let date = new Date();
          let year = date.getFullYear();
          let month: string | number = date.getMonth() + 1;
          let day: string | number = date.getDate();

          if (day < 10) {
            day = '0' + day;
          }
          if (month < 10) {
            month = '0' + month;
          }

          let today = year + '-' + month + '-' + day;

          await inboxModel.addToInbox(
            id,
            'You are now a premium member!',
            today,
          );
        }
      } else {
        res.status(SERVER_BAD_REQUEST).json(result);
      }
    } else {
      res.status(SERVER_BAD_REQUEST).json({
        success: false,
        data: {},
        message: 'Please Check Field Requirements or Error on Server Side',
      });
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
    return;
  }
}

async function createEvent(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let {
      event_name,
      category,
      event_date,
      place,
      price,
      description,
      available_seat,
      image,
    } = req.body;

    let user = await userModel.getUserData(decoded);

    if (user.data.user_role !== 'Admin') {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Only admin can create an event',
      });
      return;
    }

    if (
      !event_name ||
      !category ||
      !event_date ||
      !place ||
      !price ||
      !description ||
      !available_seat
    ) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Please fill all required fields',
      });
      return;
    }

    image = image ? image : null;

    let result = await eventModel.newEvent({
      event_name,
      category,
      event_date,
      place,
      price,
      description,
      available_seat,
      image,
    });

    if (result.success) {
      let date = new Date(result.data.event_date);
      let year = date.getFullYear();
      let month: string | number = date.getMonth() + 1;
      let dt: string | number = date.getDate();

      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }

      result.data.event_date = year + '-' + month + '-' + dt;

      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function getEvent(req: Request, res: Response) {
  try {
    let { id } = req.params;

    let result = await eventModel.getEventById(id);

    if (result.success) {
      let date = new Date(result.data.event_date);
      let year = date.getFullYear();
      let month: string | number = date.getMonth() + 1;
      let dt: string | number = date.getDate();

      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }

      result.data.event_date = year + '-' + month + '-' + dt;
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function updateEvent(req: Request, res: Response) {
  try {
    let id = req.params.id;
    let {
      event_name,
      category,
      event_date,
      place,
      price,
      description,
      available_seat,
      isImageChange,
    } = req.body;

    if (
      !event_name ||
      !category ||
      !event_date ||
      !place ||
      !price ||
      !description ||
      !available_seat
    ) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Please fill all required fields',
      });
      return;
    }

    if (req.file && isImageChange === 'true') {
      const file = dataUri(req).content;
      return uploader
        .upload(file)
        .then(async (db_result: any) => {
          let image = db_result.url;
          let result: ResponseObject = await eventModel.editEvent(
            {
              event_name,
              category,
              event_date,
              place,
              price,
              description,
              available_seat,
              image,
            },
            id,
          );

          if (result.success) {
            res.status(SERVER_OK).json(result);
          } else {
            res.status(SERVER_BAD_REQUEST).json(result);
          }
        })
        .catch((err: any) =>
          res.status(SERVER_BAD_REQUEST).json({
            success: false,
            data: {
              err,
            },
            message: 'Someting went wrong while processing your request',
          }),
        );
    } else if (isImageChange === 'false') {
      let result = await eventModel.editEvent(
        {
          event_name,
          category,
          event_date,
          place,
          price,
          description,
          available_seat,
          image: null,
        },
        id,
      );

      if (result.success) {
        res.status(SERVER_OK).json(result);
      } else {
        res.status(SERVER_BAD_REQUEST).json(result);
      }
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function deleteEvent(req: Request, res: Response) {
  try {
    let { id } = req.params;

    let result = await eventModel.deleteEvent(id);

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function createForum(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { forum_name, category, description, image } = req.body;

    let user = await userModel.getUserData(decoded);

    let id_user = user.data.id;

    if (user.data.user_role !== 'Admin') {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Only admin can create a forum',
      });
      return;
    }

    if (!forum_name || !category || !description) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Please fill all required fields',
      });
      return;
    }

    image = image ? image : null;

    let result = await forumModel.newForum({
      id_user,
      forum_name,
      category,
      description,
      image,
    });

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function getForum(req: Request, res: Response) {
  try {
    let { id } = req.params;

    let result = await forumModel.getForumById(id);

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function getForumCategory(req: Request, res: Response) {
  try {
    let { category } = req.params;

    let result = await forumModel.getForumByCategory(category);

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function updateForum(req: Request, res: Response) {}

async function deleteForum(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { id } = req.params;

    let user = await userModel.getUserData(decoded);

    if (user.data.user_role !== 'Admin') {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Only admin can delete a forum',
      });
      return;
    }

    let result = await forumModel.deleteForum(id);

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function newComments(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { id: id_user } = decoded;
    let { id_forum, comment } = req.body;

    let result = await commentModel.addComment({
      id_forum,
      id_user,
      comment,
    });

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function editComments(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { id: id_user } = decoded;
    let { id_forum, comment, likes } = req.body;

    if (!id_forum) {
      res.status(SERVER_BAD_REQUEST).json({
        success: false,
        data: {},
        message: 'Please fill all required fields',
      });
    }

    let result = await commentModel.updateComment(
      {
        id_forum,
        comment,
        likes,
      },
      id_user,
    );

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function getComments(req: Request, res: Response) {
  try {
    let { id: id_forum } = req.params;

    if (!id_forum) {
      res.status(SERVER_BAD_REQUEST).json({
        success: false,
        data: {},
        message: 'Please fill all required fields',
      });
    }

    let result = await commentModel.getAllComments(Number(id_forum));

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function newTicket(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { id: id_user } = decoded;
    let { id_event, type, qty } = req.body;

    let eventResult = await eventModel.getEventById(id_event);

    if (eventResult.success !== true) {
      res.status(SERVER_BAD_REQUEST).json(eventResult);
      return;
    }

    let {
      event_name,
      category,
      event_date,
      place,
      price,
      description,
      available_seat,
      image,
    } = eventResult.data;

    available_seat -= qty;

    if (available_seat < 0) {
      res.status(SERVER_BAD_REQUEST).json({
        success: false,
        data: {},
        message: 'The number of seat available is not enough',
      });
      return;
    }

    await eventModel.editEvent(
      {
        event_name,
        category,
        event_date,
        place,
        price,
        description,
        available_seat,
        image,
      },
      id_event,
    );

    let total: number = qty * price;

    let result = await ticketModel.buyTicket({
      id_event,
      id_user,
      type,
      qty,
      total,
    });

    if (result.success) {
      res.status(SERVER_OK).json(result);

      let date = new Date();
      let year = date.getFullYear();
      let month: string | number = date.getMonth() + 1;
      let day: string | number = date.getDate();

      if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }

      let today = year + '-' + month + '-' + day;

      await inboxModel.addToInbox(
        id_user,
        `Your e-ticket for ${event_name} has been issued!`,
        today,
      );
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function inboxMessage(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { id: id_user } = decoded;

    let result = await inboxModel.getInbox(id_user);

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

export default {
  editProfile,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  createForum,
  getForum,
  getForumCategory,
  updateForum,
  deleteForum,
  newComments,
  editComments,
  getComments,
  newTicket,
  inboxMessage,
};
