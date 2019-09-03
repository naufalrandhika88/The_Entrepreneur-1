import {Db, Collection, ObjectID, UpdateWriteOpResult} from 'mongodb';
import {getDB} from '../db';
import {PostObject, DecodedObject, ReqPostingObject} from '../types';
import {isIncluded, deDupObject} from '../helpers';

async function getPostByPostId(
  postId: string | ObjectID,
  decoded: DecodedObject,
) {
  try {
    let {_id: myId} = decoded;
    let db: Db = await getDB();
    let collectionPost: Collection = await db.collection('Posts');

    if (typeof myId === 'string') {
      myId = new ObjectID(myId);
    }
    if (typeof postId === 'string') {
      postId = new ObjectID(postId);
    } else if (typeof postId !== 'object') {
      return {
        success: false,
        data: [],
        message: 'wrong datatypes of parameters',
      };
    }

    let PostByPostId: Array<PostObject> = await collectionPost
      .find({
        _id: postId,
      })
      .sort({timestamp: -1})
      .toArray();

    let isLikedByYou = isIncluded(PostByPostId[0].likedBy, myId);
    let finalPost = {...PostByPostId[0], isLikedByYou};
    return {
      success: true,
      data: finalPost,
      message: 'Successfully retrieve post detail',
    };
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function getAllPostByUserId(
  userId: string | ObjectID | null,
  decoded: DecodedObject,
) {
  try {
    let {_id: myId} = decoded;
    let db: Db = await getDB();
    let collectionPost: Collection = await db.collection('Posts');

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

    let allPostById: Array<PostObject> = await collectionPost
      .find({userId: userId})
      .sort({timestamp: -1})
      .toArray();

    let finalPost = [];
    if (allPostById.length > 0) {
      finalPost = allPostById.map((item) => {
        let isLike: boolean = false;
        if (item) {
          isLike = isIncluded(item.likedBy, myId);
          return {...item, isLikedByYou: isLike};
        } else {
          throw 'item in Array is empty';
        }
      });
    } else {
      return {
        success: true,
        data: [],
        message: 'There is no post yet',
      };
    }

    return {
      success: true,
      data: finalPost,
      message: 'Successfully retrieve all of the user posts',
    };
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function getAllFollowingPost(decoded: DecodedObject) {
  let {_id: userId} = decoded;
  try {
    let db: Db = await getDB();
    let collectionUser: Collection = await db.collection('Users');
    let collectionPost: Collection = await db.collection('Posts');

    if (typeof userId === 'string') {
      userId = new ObjectID(userId);
    } else if (typeof userId !== 'object') {
      return {success: false, data: [], message: 'wrong datatypes of decoded'};
    }

    let userData: Array<{
      _id: ObjectID;
      avatar: string;
      following: Array<ObjectID>;
    }> = await collectionUser
      .find({_id: userId}, {projection: {avatar: 1, following: 1}})
      .toArray();

    userData[0].following.push(userId);

    let allPost: Array<PostObject> | undefined = await collectionPost
      .find({
        userId: {$in: userData[0].following},
      })
      .sort({timestamp: -1})
      .toArray();

    if (userData[0].following.length === 0) {
      return {
        success: true,
        data: {
          _id: userData[0]._id,
          avatar: userData[0].avatar,
          followingPosts: allPost,
        },
        message: 'You are not following anybody',
      };
    }

    let finalPost;
    if (allPost.length > 0) {
      finalPost = await Promise.all(
        allPost.map(async (item) => {
          let isLike: boolean = isIncluded(item.likedBy, userId);
          let friends = await collectionUser
            .find(
              {_id: item.userId},
              {projection: {fullName: 1, avatar: 1, _id: 0}},
            )
            .toArray();
          return {
            ...item,
            fullName: friends[0].fullName,
            avatar: friends[0].avatar,
            isLikedByYou: isLike,
          };
        }),
      );
    } else {
      return {
        success: true,
        data: {
          _id: userData[0]._id,
          avatar: userData[0].avatar,
          followingPosts: [],
        },
        message: 'There is no post yet, be the first!',
      };
    }

    return {
      success: true,
      data: {
        _id: userData[0]._id,
        avatar: userData[0].avatar,
        followingPosts: finalPost,
      },
      message: "Successfully retrieve all of the user's following posts",
    };
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function toggleLikePost(
  postId: ObjectID | string,
  decoded: DecodedObject,
) {
  try {
    let {_id: userId} = decoded;
    let db: Db = await getDB();
    let collectionPost: Collection = await db.collection('Posts');

    if (typeof postId === 'string') {
      postId = new ObjectID(postId);
    } else if (typeof postId !== 'object') {
      return {
        success: false,
        data: [],
        message: 'wrong datatypes of parameters',
      };
    }
    if (typeof userId === 'string') {
      userId = new ObjectID(userId);
    } else if (typeof userId !== 'object') {
      return {success: false, data: [], message: 'wrong datatypes of decoded'};
    }

    let postLike = await collectionPost
      .find({_id: postId}, {projection: {likedBy: 1}})
      .sort({timestamp: -1})
      .sort({timestamp: -1})
      .toArray();

    let isLike: boolean = postLike[0].likedBy
      ? isIncluded(postLike[0].likedBy, userId)
      : false;

    let queryResult: UpdateWriteOpResult;
    if (!isLike) {
      queryResult = await collectionPost.updateOne(
        {_id: postId},
        {$push: {likedBy: userId}},
        {upsert: true},
      );
      return {
        success: true,
        data: [],
        message: `${queryResult.modifiedCount} Post liked`,
      };
    } else if (isLike) {
      queryResult = await collectionPost.updateOne(
        {_id: postId},
        {$pull: {likedBy: userId}},
        {upsert: true},
      );
      return {
        success: true,
        data: [],
        message: `${queryResult.modifiedCount} Post unliked`,
      };
    } else {
      return {
        success: false,
        data: [],
        message: 'Server Error on like feature, Please Contact',
      };
    }
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function searchLocation(userInput: string) {
  try {
    let db: Db = await getDB();
    let collectionPost: Collection = await db.collection('Posts');
    let re = new RegExp(userInput, 'i');

    let searchedLocation = await collectionPost
      .find({location: {$regex: re}}, {projection: {location: 1, _id: 0}})
      .sort({timestamp: -1})
      .toArray();
    let finalLocation = deDupObject(searchedLocation);

    return {
      success: true,
      data: finalLocation,
      message: finalLocation ? finalLocation.length : 0,
    };
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

async function addPost(
  reqPostObject: ReqPostingObject,
  decoded: DecodedObject,
) {
  try {
    let {_id: userId} = decoded;
    let {postImage, postCaption, location, coordinates} = reqPostObject;
    let db: Db = await getDB();
    let collectionPost: Collection = await db.collection('Posts');

    if (typeof userId === 'string') {
      userId = new ObjectID(userId);
    } else if (typeof userId !== 'object') {
      return {success: false, data: [], message: 'wrong datatypes of decoded'};
    }

    let query = await collectionPost.insertOne({
      userId,
      postImage,
      postCaption,
      location,
      coordinates,
      timestamp: Date.now(),
      likedBy: [],
    });

    return {
      success: true,
      data: [],
      message: query ? 'Post Added' : 'Post Failed',
    };
  } catch (e) {
    return {success: false, data: [], message: String(e)};
  }
}

export default {
  getPostByPostId,
  getAllPostByUserId,
  getAllFollowingPost,
  toggleLikePost,
  searchLocation,
  addPost,
};
