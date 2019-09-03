import {Request, Response} from 'express';
import {SERVER_OK, SERVER_BAD_REQUEST} from '../constants';
import userModel from '../models/userModel';
import {ResponseObject} from '../types';
import {generateResponse} from '../helpers';
import {isEmail} from 'validator';

async function signUp(req: Request, res: Response) {
  try {
    let {email, username, fullName, password} = req.body;
    if (!email || !username || !fullName || !password) {
      res.status(SERVER_OK).json(
        generateResponse({
          success: false,
          data: [],
          message: 'Please fill all required fields',
        }),
      );
      return;
    } else if (!isEmail(email)) {
      res.status(SERVER_OK).json(
        generateResponse({
          success: false,
          data: [],
          message: 'Email format is wrong',
        }),
      );
      return;
    }
    let modelResponse: ResponseObject = await userModel.userSignUp({
      email,
      username,
      fullName,
      password,
    });
    if (modelResponse.success) {
      res.status(SERVER_OK).json(generateResponse(modelResponse));
    } else {
      res.status(SERVER_BAD_REQUEST).json(generateResponse(modelResponse));
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
    return;
  }
}

async function signIn(req: Request, res: Response) {
  let {username, password} = req.body;
  try {
    let modelResponse: ResponseObject = await userModel.userSignIn({
      username,
      password,
    });
    if (modelResponse.success) {
      res.status(SERVER_OK).json(generateResponse(modelResponse));
    } else {
      res.status(SERVER_BAD_REQUEST).json(generateResponse(modelResponse));
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
    return;
  }
}

export default {signUp, signIn};
