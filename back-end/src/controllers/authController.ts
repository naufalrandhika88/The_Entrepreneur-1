import { Request, Response } from 'express';

import userModel from '../models/userModel';

async function signUp(req: Request, res: Response) {
  let { email, username, first_name, last_name, password } = req.body;

  let result = await userModel.userSignUp({
    email,
    username,
    first_name,
    last_name,
    password,
  });

  res.send(result);

  return;
}

export default { signUp };
