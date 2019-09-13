import userModel from '../models/userModel';
import { ResponseObject } from '../types';
import { Request, Response } from 'express';
import { SERVER_OK, SERVER_BAD_REQUEST } from '../constants';
import { dataUri } from '../helpers';
import { uploader } from '../cloudinarySetup';

async function editProfile(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let { isAvatarChange, first_name, last_name, gender } = req.body;
    if (!first_name || !gender) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Please fill all required fields',
      });
      return;
    }
    if (req.file && isAvatarChange === true) {
      const file = dataUri(req).content;
      return uploader
        .upload(file)
        .then(async (db_result: any) => {
          let avatar = db_result.url;
          let result: ResponseObject = await userModel.updateUser(
            { avatar, first_name, last_name, gender },
            decoded,
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
    } else if (isAvatarChange === false) {
      let result: ResponseObject = await userModel.updateUser(
        { avatar: null, first_name, last_name, gender },
        decoded,
      );
      if (result.success) {
        res.status(SERVER_OK).json(result);
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

export default { editProfile };
