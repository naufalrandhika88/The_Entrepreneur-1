import { Request, Response } from 'express';

import * as taskModel from '../models/taskModel';

async function signIn(req: Request, res: Response) {
  let result = await taskModel.getAllTask();
  res.send(result);

  console.log('masuk');

  return;
}

export default { signIn };
