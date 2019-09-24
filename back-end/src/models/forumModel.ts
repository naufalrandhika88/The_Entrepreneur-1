import { QueryResult } from 'pg';

import { getDB } from '../db';
import { CreateForum } from '../types';

async function newForum(forumObject: CreateForum) {
    let db = await getDB();

    let {
        id_user,
        forum_name,
        category,
        description,
        image,
    } = forumObject;

    let values = [
        id_user,
        forum_name,
        category,
        description,
        image,
    ];

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

export default { newForum };