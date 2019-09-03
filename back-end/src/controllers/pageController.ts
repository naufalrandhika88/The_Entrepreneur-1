import postModel from '../models/postModel';
import {ResponseObject} from '../types';
import {ObjectID} from 'mongodb';
import {Request, Response} from 'express';
import {SERVER_OK, SERVER_BAD_REQUEST} from '../constants';
import {generateResponse, isObjectEmpty} from '../helpers';
import userModel from '../models/userModel';

async function home(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let modelResponse: ResponseObject = await postModel.getAllFollowingPost(
      decoded,
    );
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

async function profile(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    if (isObjectEmpty(req.params)) {
      let userDataResponse = await userModel.getUserData(null, decoded);
      let allPostResponse = await postModel.getAllPostByUserId(null, decoded);

      let response = {
        success:
          userDataResponse.success && allPostResponse.success ? true : false,
        data: {...userDataResponse.data, posts: allPostResponse.data},
        message: userDataResponse.message + ' & ' + allPostResponse.message,
      };

      if (userDataResponse.success && allPostResponse.success) {
        res.status(SERVER_OK).json(generateResponse(response));
      } else {
        res.status(SERVER_BAD_REQUEST).json(generateResponse(response));
      }
    } else {
      let {userId}: {userId: ObjectID | string} = req.params;
      let userDataResponse = await userModel.getUserData(userId, decoded);
      let allPostResponse = await postModel.getAllPostByUserId(userId, decoded);

      let response = {
        success:
          userDataResponse.success && allPostResponse.success ? true : false,
        data: {...userDataResponse.data, posts: allPostResponse.data},
        message: "successfully retrieve user's profile",
      };
      if (userDataResponse.success && allPostResponse.success) {
        res.status(SERVER_OK).json(generateResponse(response));
      } else {
        res.status(SERVER_BAD_REQUEST).json(generateResponse(response));
      }
    }
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function detail(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let {postId}: {postId: ObjectID | string} = req.params;
    let postDetailResponse: ResponseObject = await postModel.getPostByPostId(
      postId,
      decoded,
    );
    let userDataResponse: ResponseObject = await userModel.getUserData(
      postDetailResponse.data.userId,
      decoded,
    );
    let response = {
      success:
        userDataResponse.success && postDetailResponse.success ? true : false,
      data: {
        ...postDetailResponse.data,
        avatar: userDataResponse.data.avatar,
        fullName: userDataResponse.data.fullName,
      },
      message: postDetailResponse.message
        ? postDetailResponse.message
        : 'Failed to get Post Detail on server',
    };
    if (response.success) {
      res.status(SERVER_OK).json(generateResponse(response));
    } else {
      res.status(SERVER_BAD_REQUEST).json(generateResponse(response));
    }
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

export default {home, profile, detail};
