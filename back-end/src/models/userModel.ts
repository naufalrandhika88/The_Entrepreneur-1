import {Db, Collection, ObjectID} from 'mongodb';
import {getDB} from '../db';
import {isIncluded} from '../helpers';
import {
  UserSignUp,
  UserSignIn,
  User,
  DecodedObject,
  ReqEditProfileObject,
} from '../types';
import sjcl from 'sjcl';
import jwt from 'jsonwebtoken';
import {API_SECRET} from '../constants';

async function userSignUp(userObject: UserSignUp) {
  try {
    let db: Db = await getDB();
    let {email, username, fullName, password} = userObject;

    let collectionUser: Collection = await db.collection('Users');
    collectionUser.createIndex({email: 1, username: 1}, {unique: true});

    if (await collectionUser.findOne({email})) {
      return {
        success: false,
        data: [],
        message: 'Email already registered.',
      };
    } else {
      if (await collectionUser.findOne({username})) {
        return {
          success: false,
          data: [],
          message: 'Username already registered.',
        };
      }
    }
    let hash = sjcl.codec.hex.fromBits(
      sjcl.hash.sha256.hash(password + username.slice(0, 3)),
    );

    let encrypted = sjcl.encrypt(username.slice(-3), hash);

    let queryResult = await collectionUser.insertOne({
      email,
      username,
      fullName,
      password: encrypted,
      avatar: null,
      bio: 'Hi I am new on Snapin',
      follower: [],
      following: [],
      birthday: '01-01-2000',
      website: null,
      gender: 'Other',
    });

    let gotUser: Array<User> = await collectionUser
      .find({email, username})
      .toArray();

    let response: User;
    {
      response = (({
        _id,
        email,
        fullName,
        username,
        avatar,
        bio,
        follower,
        following,
        birthday,
        website,
        gender,
      }) => ({
        _id,
        email,
        fullName,
        username,
        avatar,
        bio,
        follower,
        following,
        birthday,
        website,
        gender,
      }))(gotUser[0]);
    }
    let {_id} = gotUser[0];
    let token = jwt.sign({_id}, API_SECRET, {expiresIn: '144h'});

    return {
      success: queryResult.result.ok ? true : false,
      data: response,
      message: `User Added(${queryResult.result.n}) : ` + fullName,
      token: token ? token : '',
    };
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function userSignIn(userObject: UserSignIn) {
  try {
    let db: Db = await getDB();
    let {username, password} = userObject;
    let collectionUser: Collection = await db.collection('Users');

    let hash = sjcl.codec.hex.fromBits(
      sjcl.hash.sha256.hash(password + username.slice(0, 3)),
    );

    let gotUser = await collectionUser.find({username}).toArray();

    if (gotUser[0]) {
      let decrypted = sjcl.decrypt(username.slice(-3), gotUser[0].password);
      if (hash === decrypted) {
        let {
          _id,
          email,
          fullName,
          username,
          avatar,
          bio,
          follower,
          following,
          birthday,
          website,
          gender,
        } = gotUser[0];

        let token = jwt.sign({_id}, API_SECRET, {expiresIn: '144h'});

        return {
          success: true,
          data: {
            _id: String(_id),
            email,
            fullName,
            username,
            avatar,
            bio,
            follower,
            following,
            birthday,
            website,
            gender,
          },
          message: 'Login Success',
          token,
        };
      }
    }

    return {
      success: false,
      data: [],
      message: 'Incorrect username/password',
    };
  } catch (e) {
    return {success: false, data: [], message: 'Incorrect username/password'};
  }
}

async function getUserData(
  userId: string | ObjectID | null,
  decoded: DecodedObject,
) {
  try {
    let {_id: myId} = decoded;
    let db: Db = await getDB();
    let collectionUser: Collection = await db.collection('Users');

    if (typeof myId === 'string') {
      myId = new ObjectID(myId);
    }
    if (!userId) {
      userId = myId;
    } else if (typeof userId === 'string') {
      userId = new ObjectID(userId);
    } else if (typeof userId !== 'object') {
      return {
        success: false,
        data: [],
        message: 'wrong datatypes of parameters',
      };
    }

    let userData = await collectionUser.find({_id: userId}).toArray();

    let isFollowedByYou;
    if (userData.length > 0) {
      isFollowedByYou = userData
        .map((item) => {
          let isFollow: boolean = false;
          if (item) {
            isFollow = isIncluded(item.follower, myId);
            return isFollow;
          } else {
            throw 'item in Array is empty';
          }
        })
        .pop();
    } else {
      return {
        success: false,
        data: [],
        message: 'User Identifier not recognized',
      };
    }

    let {
      _id,
      email,
      fullName,
      username,
      avatar,
      bio,
      follower,
      following,
      birthday,
      website,
      gender,
    } = userData[0];

    let profile = {
      _id: String(_id),
      email,
      fullName,
      username,
      avatar,
      bio,
      follower,
      following,
      isFollowedByYou,
      birthday,
      website,
      gender,
    };
    return {
      success: true,
      data: profile,
      message: "Successfully retrieve user's profile",
    };
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function searchUser(userInput: string) {
  try {
    let db: Db = await getDB();
    let collectionUser: Collection = await db.collection('Users');
    let re = new RegExp(userInput, 'i');

    let searchedUser: any = await collectionUser
      .find(
        {username: {$regex: re}},
        {projection: {avatar: 1, fullName: 1, username: 1}},
      )
      .toArray();

    return {
      success: true,
      data: searchedUser,
      message: searchedUser ? searchedUser.length : 0,
    };
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function toggleFollowUser(
  userId: string | ObjectID,
  decoded: DecodedObject,
) {
  try {
    let {_id: myId} = decoded;
    let db: Db = await getDB();
    let collectionUser: Collection = await db.collection('Users');

    if (typeof userId === 'string') {
      userId = new ObjectID(userId);
    } else if (typeof userId !== 'object') {
      return {
        success: false,
        data: [],
        message: 'wrong datatypes of parameters',
      };
    }
    if (typeof myId === 'string') {
      myId = new ObjectID(myId);
    } else if (typeof myId !== 'object') {
      return {success: false, data: [], message: 'wrong datatypes of decoded'};
    }

    let myFollowing = await collectionUser
      .find({_id: myId}, {projection: {following: 1}})
      .toArray();

    let itFollowers = await collectionUser
      .find({_id: userId}, {projection: {follower: 1}})
      .toArray();

    let isFollowed: boolean = itFollowers[0].follower
      ? isIncluded(itFollowers[0].follower, myId)
      : false;

    let isFollowing: boolean = myFollowing[0].following
      ? isIncluded(myFollowing[0].following, userId)
      : false;

    if (!isFollowed && !isFollowing) {
      let queryResult1 = await collectionUser.updateOne(
        {_id: myId},
        {$push: {following: userId}},
        {upsert: true},
      );
      let queryResult2 = await collectionUser.updateOne(
        {_id: userId},
        {$push: {follower: myId}},
        {upsert: true},
      );
      return {
        success: true,
        data: [],
        message: `${queryResult2.modifiedCount} User Followed`,
      };
    } else if (isFollowed && isFollowing) {
      let queryResult1 = await collectionUser.updateOne(
        {_id: myId},
        {$pull: {following: userId}},
        {upsert: true},
      );
      let queryResult2 = await collectionUser.updateOne(
        {_id: userId},
        {$pull: {follower: myId}},
        {upsert: true},
      );
      return {
        success: true,
        data: [],
        message: `${queryResult2.modifiedCount} User Unfollowed`,
      };
    } else {
      return {
        success: false,
        data: [],
        message: 'Server Error on follow feature, Please Contact',
      };
    }
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function updateUser(
  editReq: ReqEditProfileObject,
  decoded: DecodedObject,
) {
  try {
    let {avatar, fullName, bio, website, gender, birthday} = editReq;
    let {_id: myId} = decoded;
    if (typeof myId === 'string') {
      myId = new ObjectID(myId);
    } else if (typeof myId !== 'object') {
      return {success: false, data: [], message: 'wrong datatypes of decoded'};
    }

    let db: Db = await getDB();
    let collectionUser: Collection = await db.collection('Users');

    let queryResult;
    if (avatar) {
      queryResult = await collectionUser.updateOne(
        {_id: myId},
        {$set: {avatar, fullName, bio, website, gender, birthday}},
        {upsert: true},
      );
    } else {
      queryResult = await collectionUser.updateOne(
        {_id: myId},
        {$set: {fullName, bio, website, gender, birthday}},
        {upsert: true},
      );
    }

    let userData = await getUserData(null, decoded);

    return {
      success: true,
      data: userData.data,
      message: queryResult
        ? queryResult.modifiedCount + ' Profile Data Updated'
        : '0 Profile Data Updated',
    };
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

export default {
  userSignUp,
  userSignIn,
  getUserData,
  searchUser,
  toggleFollowUser,
  updateUser,
};
