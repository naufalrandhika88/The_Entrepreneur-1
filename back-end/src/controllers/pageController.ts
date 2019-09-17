import { Request, Response } from 'express';

import { SERVER_OK, SERVER_BAD_REQUEST } from '../constants';
import userModel from '../models/userModel';
import eventModel from '../models/eventModel';

async function profile(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;

    let result = await userModel.getUserData(decoded);

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    return { success: false, data: {}, message: String(e) };
  }
}

async function home(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;

    let userResult = await userModel.getUserData(decoded);
    let eventResult = await eventModel.getEvent();

    if (userResult.success && eventResult.success) {
      res.status(SERVER_OK).json({
        success: true,
        data: {
          user: userResult.data,
          events: eventResult.data.event,
        },
      });
    } else {
      res.status(SERVER_BAD_REQUEST).json({
        success: false,
        data: {},
        message: userResult.message + eventResult.message,
      });
    }
  } catch (e) {
    return { success: false, data: {}, message: String(e) };
  }
}

export default { profile, home };
