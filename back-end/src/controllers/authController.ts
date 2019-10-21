import { QueryResult } from 'pg';
import { Request, Response } from 'express';

import { isEmail } from 'validator';
import userModel from '../models/userModel';
import { SERVER_OK, SERVER_BAD_REQUEST } from '../constants';
import { getDB } from '../db';
import { Role } from '../types';

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
    let user: QueryResult;
    user = await db.query('SELECT * FROM users where email = $1', [email]);
    if (user.rowCount !== 0) {
      res.status(SERVER_OK).json({
        success: false,
        data: {},
        message: 'Email already exist',
      });
    }

    let user_role: Role = email.endsWith('@admin.tes') ? 'Admin' : 'User';

    let result = await userModel.userSignUp({
      email,
      user_role,
      full_name,
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

    let result = await userModel.userSignIn({
      email,
      password,
    });

    res.send(result);

    return;
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
    return;
  }
}

export default { signUp, signIn };
