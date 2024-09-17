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
    let decoded = (<any>req).decoded;
    let { id: id_user } = decoded;

    let result = await forumModel.getForumById(id);
    let userResult = await userModel.getUserData(
      undefined,
      result.data.id_user,
    );
    let likes: Array<{ id: number }> = [];
    let is_liked_by_you: boolean = false;

    for (let i = 0; i < result.data.is_liked_by.length; i += 1) {
      likes.push(JSON.parse(result.data.is_liked_by[i]));
    }
    result.data.is_liked_by = likes;

    if (
      result.data.is_liked_by.find((like) => {
        return like.id == id_user;
      })
    ) {
      is_liked_by_you = true;
    }
    result.data.is_liked_by_you = is_liked_by_you;
    result.data.full_name = userResult.data.full_name;
    result.data.avatar = userResult.data.avatar;

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function getAllForums(req: Request, res: Response) {
  try {
    let result: ResponseObject = await forumModel.getCategorizedForum();

    let tempUmum: any = [];
    let tempJual: any = [];
    let tempBeli: any = [];

    const getData = async (item) => {
      let userResult: ResponseObject = await userModel.getUserData(
        undefined,
        item.id_user,
      );
      let commentResult: ResponseObject = await commentModel.getAllComments(
        item.id,
      );
      item.full_name = userResult.data.full_name;
      item.comment_length = commentResult.data.length;
      return item;
    };

    const getUmumData = async () => {
      return Promise.all(result.data.umum.map((item) => getData(item)));
    };

    const getJualData = async () => {
      return Promise.all(result.data.jual.map((item) => getData(item)));
    };

    const getBeliData = async () => {
      return Promise.all(result.data.beli.map((item) => getData(item)));
    };

    tempUmum.push(await getUmumData());
    tempJual.push(await getJualData());
    tempBeli.push(await getBeliData());

    if (result.success) {
      result.data.umum = tempUmum[0];
      result.data.jual = tempJual[0];
      result.data.beli = tempBeli[0];
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function updateForum(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;

    let id = req.params.id;

    let { forum_name, category, description, image } = req.body;

    let user = await userModel.getUserData(decoded);

    if (user.data.user_role !== 'Admin') {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Only admin can update a forum',
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

    let result = await forumModel.updateForum(
      {
        forum_name,
        category,
        description,
        image,
      },
      id,
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

async function likesForum(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { id: id_user } = decoded;
    let { id: id_forum } = req.params;
    let result: ResponseObject;

    let likes: Array<{ id: number }> = [];

    let forum = await forumModel.getForumById(id_forum);

    for (let i = 0; i < forum.data.is_liked_by.length; i += 1) {
      likes.push(JSON.parse(forum.data.is_liked_by[i]));
    }
    forum.data.is_liked_by = likes;

    if (
      forum.data.is_liked_by.find((like) => {
        return like.id == id_user;
      })
    ) {
      forum.data.is_liked_by = forum.data.is_liked_by.filter((like) => {
        return like.id != id_user;
      });
      forum.data.likes -= 1;
      result = await forumModel.updateForum(forum.data, id_forum);
    } else {
      forum.data.is_liked_by.push({ id: id_user });
      forum.data.likes += 1;
      result = await forumModel.updateForum(forum.data, id_forum);
    }
    result.data.is_liked_by = forum.data.is_liked_by;

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
  }
}

async function likesComment(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { id: id_user } = decoded;
    let { id: id_comment } = req.params;
    let result: ResponseObject;

    let likes: Array<{ id: number }> = [];

    let comment: ResponseObject = await commentModel.getCommentById(
      Number(id_comment),
    );
    for (let i = 0; i < comment.data.is_liked_by.length; i += 1) {
      likes.push(JSON.parse(comment.data.is_liked_by[i]));
    }
    comment.data.is_liked_by = likes;
    if (
      comment.data.is_liked_by.find((like) => {
        return like.id == id_user;
      })
    ) {
      comment.data.is_liked_by = comment.data.is_liked_by.filter((like) => {
        return like.id != id_user;
      });
      comment.data.likes -= 1;
      result = await commentModel.updateComment(
        comment.data,
        Number(id_comment),
      );
    } else {
      comment.data.is_liked_by.push({ id: id_user });
      comment.data.likes += 1;
      result = await commentModel.updateComment(
        comment.data,
        Number(id_comment),
      );
    }
    result.data.likes = comment.data.likes;
    result.data.is_liked_by = comment.data.is_liked_by;

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
    result.data.date = year + '-' + month + '-' + day;

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
    let { comment } = req.body;
    let { id: id_comment } = req.params;

    let result = await commentModel.updateComment(
      {
        comment,
      },
      Number(id_comment),
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
    let decoded = (<any>req).decoded;
    let { id: id_user } = decoded;
    let { id: id_forum } = req.params;

    if (!id_forum) {
      res.status(SERVER_BAD_REQUEST).json({
        success: false,
        data: {},
        message: 'Please fill all required fields',
      });
    }

    let result: ResponseObject = await commentModel.getAllComments(
      Number(id_forum),
    );
    result.data.sort((a, b) => b.date - a.date);

    result.data.map((element) => {
      let date = new Date(element.date);
      let year = date.getFullYear();
      let month: string | number = date.getMonth() + 1;
      let day: string | number = date.getDate();

      if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }

      element.date = year + '-' + month + '-' + day;

      if (
        element.is_liked_by.find((like) => {
          return like.id == id_user;
        })
      ) {
        element.is_liked_by_you = true;
      } else {
        element.is_liked_by_you = false;
      }
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

async function getTicketById(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { id: id_user } = decoded;

    let result = await ticketModel.getUserTicket(id_user);

    if (result.success) {
      res.status(SERVER_OK).json(result);
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

async function deleteInbox(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { id: id_user } = decoded;

    let { id: id_inbox } = req.params;

    let result = await inboxModel.deleteInbox(Number(id_inbox), id_user);

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
  getAllForums,
  updateForum,
  deleteForum,
  likesForum,
  newComments,
  editComments,
  getComments,
  likesComment,
  newTicket,
  getTicketById,
  inboxMessage,
  deleteInbox,
};
