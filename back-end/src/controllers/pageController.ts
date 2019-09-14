import { Request, Response } from 'express';
import { SERVER_OK, SERVER_BAD_REQUEST } from '../constants';
import userModel from '../models/userModel';

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

export default { profile };
