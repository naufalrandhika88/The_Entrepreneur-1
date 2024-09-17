import { QueryResult } from 'pg';
import { Request, Response } from 'express';
import inboxModel from '../models/inboxModel';

import { isEmail } from 'validator';
import userModel from '../models/userModel';
import { SERVER_OK, SERVER_BAD_REQUEST } from '../constants';
import { getDB } from '../db';
import { Role, ResponseObject } from '../types';

async function signUp(req: Request, res: Response) {
  try {
    let { email, full_name, password } = req.body;

    if (!email || !full_name || !password) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Please fill all required fields',
      });
      return;
    }
    if (!isEmail(email)) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Email format is wrong',
      });
      return;
    }

    let db = await getDB();
    let user: QueryResult = await db.query(
      'SELECT * FROM users where email = $1',
      [email],
    );
    if (user.rowCount !== 0) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Email already exist',
      });
    }

    let user_role: Role = email.endsWith('@admin.tes') ? 'Admin' : 'User';

    let result: ResponseObject = await userModel.userSignUp({
      email,
      user_role,
      full_name,
      password,
    });

    if (result.success) {
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
        result.data.id,
        `Welcome to The Entrepreneur Society! Start your first step for being an entrepreneur`,
        today,
      );

      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
    return;
  }
}

async function signIn(req: Request, res: Response) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Please fill all required fields',
      });
      return;
    }

    let result: ResponseObject = await userModel.userSignIn({
      email,
      password,
    });

    if (result.success) {
      res.status(SERVER_OK).json(result);
    } else {
      res.status(SERVER_BAD_REQUEST).json(result);
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
    return;
  }
}

export default { signUp, signIn };
