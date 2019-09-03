import {ObjectID} from 'mongodb';

export type User = {
  _id: ObjectID | string;
  email: string;
  username: string;
  fullName: string;
  password?: string;
  avatar: string | null;
  bio: string;
  follower: Array<ObjectID> | null;
  following: Array<ObjectID> | null;
  birthday: Date | null;
  website: string | null;
  gender: string;
};

export type UserSignUp = {
  email: string;
  username: string;
  fullName: string;
  password: string;
};

export type UserSignIn = {
  username: string;
  password: string;
};

export type ResponseObject = {
  success: boolean;
  data: any;
  message: string;
  token?: string;
};

export type PostObject = {
  _id: ObjectID;
  userId: ObjectID;
  postImage: string;
  postCaption: string;
  likesCount: number;
  location: string;
  coordinates: string;
  timestamp: number;
  likedBy: Array<ObjectID>;
};

export type DecodedObject = {
  _id: ObjectID;
  iat: number;
  exp: number;
};

export type ReqPostingObject = {
  postImage: string;
  postCaption: string;
  location: string;
  coordinates: string;
};

export type ReqEditProfileObject = {
  avatar: string | null;
  isAvatarChange?: boolean;
  fullName: string;
  bio: string;
  website: string;
  gender: string;
  birthday: string;
};
