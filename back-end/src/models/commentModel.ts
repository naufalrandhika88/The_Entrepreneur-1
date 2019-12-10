import { getDB } from '../db';
import { newComment, updateComment } from '../types';
import { QueryResult } from 'pg';

async function addComment(commentObject: newComment) {
  try {
    let db = await getDB();

    let { id_forum, id_user, comment } = commentObject;
    let values = [id_forum, id_user, comment, 0, []];

    let result = await db.query(
      'INSERT INTO comments (id_forum, id_user, comment, likes, is_liked_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
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
        is_liked_by: comments.is_liked_by,
        date: comments.cdate,
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
      'SELECT comments.id, users.id as id_user, users.email, users.user_role, users.full_name, users.avatar, users.membership, users.gender, comments.comment, comments.likes, comments.is_liked_by, comments.cdate as date FROM comments INNER JOIN users ON comments.id_user = users.id WHERE id_forum = $1',
      [id_forum],
    );

    return {
      success: true,
      data: result.rows.map((item) => {
        let tempArray: Array<{ id: number }> = [];
        for (let i = 0; i < item.is_liked_by.length; i += 1) {
          tempArray.push(JSON.parse(item.is_liked_by[i]));
        }
        item.is_liked_by = tempArray;
        return item;
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

async function getCommentById(id_comment: number) {
  try {
    let db = await getDB();
    let result: QueryResult = await db.query(
      'SELECT * FROM comments WHERE id=$1',
      [id_comment],
    );

    return {
      success: true,
      data: result.rows[0],
      message: 'Successfully retrieve comment by Id',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function updateComment(commentObject: updateComment, id_comment: number) {
  try {
    let db = await getDB();

    let { comment, likes, is_liked_by } = commentObject;

    if (likes || is_liked_by) {
      await db.query(
        'UPDATE comments SET comment=$1, likes=$2, is_liked_by=$3 WHERE id=$4',
        [comment, likes, is_liked_by, id_comment],
      );
    } else {
      await db.query('UPDATE comments SET comment=$1 WHERE id=$2', [
        comment,
        id_comment,
      ]);
    }

    return {
      success: true,
      data: {
        comment,
      },
      message: 'Comment has been edited',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

export default { addComment, updateComment, getAllComments, getCommentById };
