import {ResponseObject} from '../types';
import {ObjectID} from 'mongodb';
import Datauri from 'datauri';
import path from 'path';

export const flatten = (list: any) => {
  return list.reduce(
    (a: any, b: any) => a.concat(Array.isArray(b) ? flatten(b) : b),
    [],
  );
};

export function deDupObject(location: any) {
  let obj: any = {};

  for (let i = 0, len = location.length; i < len; i++)
    obj[location[i]['location']] = location[i];

  location = new Array();
  for (let key in obj) location.push(obj[key]);
  return location;
}

export function generateResponse(response: ResponseObject) {
  if (response)
    return {
      success: response.success ? true : false,
      data: response.data ? response.data : [],
      message: response.message ? response.message : 'Failed on Server-Side',
      token: response.token ? response.token : undefined,
    };
  else
    return {
      success: false,
      message: 'Server Error (please contact and provide the case to fix)',
    };
}

export function isIncluded(arr: Array<ObjectID>, objectId: ObjectID): boolean {
  let checkLiked: boolean = false;
  arr.some((item: ObjectID) => {
    if (item.toHexString() === objectId.toHexString()) checkLiked = true;
    return checkLiked;
  });
  return checkLiked;
}

export function isObjectEmpty(obj: Object) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const dataUri = (req: any) => {
  const dUri = new Datauri();
  return dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer,
  );
};
