import { QueryResult } from 'pg';

import { getDB } from '../db';
import { CreateForum, UpdateForum } from '../types';

async function newForum(forumObject: CreateForum) {
  let db = await getDB();

  let { id_user, forum_name, category, description, image } = forumObject;

  let values = [id_user, forum_name, category, description, image];

  let result: QueryResult = await db.query(
    'INSERT INTO forums (id_user, forum_name, category, description, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values,
  );

  let forum = result.rows[0];

  return {
    success: true,
    data: {
      id: forum.id,
      id_user: forum.id_user,
      cdate: forum.cdate,
      udate: forum.udate,
      forum_name: forum.forum_name,
      category: forum.category,
      description: forum.description,
      image: forum.image,
      likes: forum.likes,
    },
    message: 'Forum created successfully',
  };
}

async function getForumById(id: string) {
  try {
    let db = await getDB();

    let result: QueryResult = await db.query(
      'SELECT * FROM forums WHERE id=$1',
      [id],
    );

    let forum = result.rows[0];

    return {
      success: true,
      data: {
        id: forum.id,
        id_user: forum.id_user,
        cdate: forum.cdate,
        udate: forum.udate,
        forum_name: forum.forum_name,
        category: forum.category,
        description: forum.description,
        image: forum.image,
        likes: forum.likes,
      },
      message: 'Successfully retrieve forum data by id',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function getCategorizedForum() {
  try {
    let db = await getDB();

    let result: QueryResult = await db.query(
      'SELECT * FROM forums WHERE category=$1',
      ['Umum'],
    );
    let umum = result.rows;

    result = await db.query('SELECT * FROM forums WHERE category=$1', ['Jual']);
    let jual = result.rows;

    result = await db.query('SELECT * FROM forums WHERE category=$1', ['Beli']);
    let beli = result.rows;

    return {
      success: true,
      data: {
        umum,
        jual,
        beli,
      },

      message: 'Successfully retrieve forums data',
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function updateForum(forumObject: UpdateForum, id: string) {
  let db = await getDB();

  let { forum_name, category, description, image } = forumObject;

  let values = [forum_name, category, description, image, id];

  await db.query(
    'UPDATE forums SET forum_name=$1, category=$2, description=$3, image=$4, udate=NOW() WHERE id=$5',
    values,
  );

  let result = await getForumById(id);

  return {
    success: true,
    data: result.data,
    message: 'Forum updated successfully',
  };
}

async function deleteForum(id: string) {
  try {
    let db = await getDB();

    await db.query('DELETE FROM forums WHERE id=$1', [id]);

    return {
      success: true,
      data: {},
      message: 'Successfully delete forum',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

export default {
  newForum,
  getForumById,
  getCategorizedForum,
  updateForum,
  deleteForum,
};
