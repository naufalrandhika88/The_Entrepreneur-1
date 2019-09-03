import userModel from '../models/userModel';
import {ResponseObject} from '../types';
import {ObjectID} from 'mongodb';
import {Request, Response} from 'express';
import {SERVER_OK, SERVER_BAD_REQUEST} from '../constants';
import {generateResponse, flatten, dataUri} from '../helpers';
import postModel from '../models/postModel';
import {uploader} from '../cloudinarySetup';
import {isEmail} from 'validator';

async function like(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let {postId}: {postId: ObjectID | string} = req.params;
    let modelResponse: ResponseObject = await postModel.toggleLikePost(
      postId,
      decoded,
    );
    if (modelResponse.success) {
      res.status(SERVER_OK).json(generateResponse(modelResponse));
    } else {
      res.status(SERVER_BAD_REQUEST).json(generateResponse(modelResponse));
    }
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function search(req: Request, res: Response) {
  try {
    let {userInput}: {userInput: string} = req.params;
    let searchedUser: ResponseObject = await userModel.searchUser(userInput);
    let searchedLocation: ResponseObject = await postModel.searchLocation(
      userInput,
    );

    let location = flatten(searchedLocation.data);
    let data = {
      user: searchedUser.data,
      location: location,
    };

    let total = searchedUser.data.length + location.length;
    let response = {
      success: searchedUser.success && searchedLocation.success ? true : false,
      data,
      message: total + ' searches found',
    };

    if (searchedUser.success && searchedLocation.success) {
      res.status(SERVER_OK).json(generateResponse(response));
    } else {
      res.status(SERVER_BAD_REQUEST).json(generateResponse(response));
    }
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function follow(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let {userId}: {userId: ObjectID | string} = req.params;
    let modelResponse: ResponseObject = await userModel.toggleFollowUser(
      userId,
      decoded,
    );
    if (modelResponse.success) {
      res.status(SERVER_OK).json(generateResponse(modelResponse));
    } else {
      res.status(SERVER_BAD_REQUEST).json(generateResponse(modelResponse));
    }
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function addPost(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    if (req.file) {
      const file = dataUri(req).content;
      return uploader
        .upload(file)
        .then(async (result: any) => {
          let postImage = result.url;
          let modelResponse: ResponseObject = await postModel.addPost(
            {...req.body, postImage},
            decoded,
          );

          if (modelResponse.success) {
            res.status(SERVER_OK).json(generateResponse(modelResponse));
          } else {
            res
              .status(SERVER_BAD_REQUEST)
              .json(generateResponse(modelResponse));
          }
        })
        .catch((err: any) =>
          res.status(SERVER_BAD_REQUEST).json({
            success: false,
            data: {
              err,
            },
            message: 'someting went wrong while processing your request',
          }),
        );
    }
  } catch (e) {
    return {success: false, message: String(e)};
  }
}

async function editProfile(req: Request, res: Response) {
  try {
    let decoded = (<any>req).decoded;
    let {isImageChange, fullName, bio, website, gender, birthday} = req.body;
    if (!fullName || !gender) {
      res.status(SERVER_OK).json(
        generateResponse({
          success: false,
          data: [],
          message: 'Please fill all required fields',
        }),
      );
      return;
    }
    if (req.file && isImageChange === 'true') {
      const file = dataUri(req).content;
      return uploader
        .upload(file)
        .then(async (result: any) => {
          let avatar = result.url;
          let modelResponse: ResponseObject = await userModel.updateUser(
            {avatar, fullName, bio, website, gender, birthday},
            decoded,
          );

          if (modelResponse.success) {
            res.status(SERVER_OK).json(generateResponse(modelResponse));
          } else {
            res
              .status(SERVER_BAD_REQUEST)
              .json(generateResponse(modelResponse));
          }
        })
        .catch((err: any) =>
          res.status(SERVER_BAD_REQUEST).json({
            success: false,
            data: {
              err,
            },
            message: 'someting went wrong while processing your request',
          }),
        );
    } else if (isImageChange === 'false') {
      let modelResponse: ResponseObject = await userModel.updateUser(
        {avatar: null, fullName, bio, website, gender, birthday},
        decoded,
      );
      if (modelResponse.success) {
        res.status(SERVER_OK).json(generateResponse(modelResponse));
      } else {
        res.status(SERVER_BAD_REQUEST).json(generateResponse(modelResponse));
      }
    } else {
      res.status(SERVER_BAD_REQUEST).json(
        generateResponse({
          success: false,
          data: [],
          message: 'Please Check Field Requirements or Error on Server Side',
        }),
      );
    }
  } catch (e) {
    res.status(SERVER_BAD_REQUEST).json(String(e));
    return;
  }
}

export default {like, follow, search, addPost, editProfile};
