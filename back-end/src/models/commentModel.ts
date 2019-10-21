import { getDB } from '../db';
import { newComment, updateComment } from '../types';
import { QueryResult } from 'pg';

async function addComment(commentObject: newComment) {
  try {
    let db = await getDB();

    let { id_forum, id_user, comment } = commentObject;
    let values = [id_forum, id_user, comment, 0];

    let result = await db.query(
      'INSERT INTO comments (id_forum, id_user, comment, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      values,
    );
    let comments = result.rows[0];

    return {
      success: true,
      data: {
        id: comments.id,
        id_forum: comments.id_forum,
        id_user: comments.id_user,
        comment: comments.comment,
        likes: comments.likes,
      },
      message: 'Comment has been added',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function getAllComments(id_forum: number) {
  try {
    let db = await getDB();

    let result: QueryResult = await db.query(
      'SELECT  users.id, users.email, users.user_role, users.full_name, users.avatar, users.membership, users.gender, comments.comment, comments.likes FROM comments INNER JOIN users ON comments.id_user = users.id',
    );

    return {
      success: true,
      data: result.rows.map((item) => {
        return {
          id_user: item.id,
          email: item.email,
          user_role: item.user_role,
          full_name: item.full_name,
          avatar: item.avatar,
          membership: item.membership,
          gender: item.gender,
          comment: item.comment,
          likes: item.likes,
        };
      }),
      message: 'Successfully retrieve comments',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function updateComment(commentObject: updateComment, id_user: number) {
  try {
    let db = await getDB();

    let { id_forum, comment, likes } = commentObject;
    let values = [comment, likes, id_forum, id_user];

    await db.query(
      'UPDATE comments SET comment=$1, likes=$2 WHERE id=$3 AND id_user=$4',
      values,
    );

    return {
      success: true,
      data: {
        comment,
        likes,
      },
      message: 'Comment has been added',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

export default { addComment, updateComment, getAllComments };
