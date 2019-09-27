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

async function getForumByCategory(category: string) {
    try {
        let db = await getDB();

        let result: QueryResult = await db.query(
            'SELECT * FROM forums WHERE LOWER(category)=LOWER($1)',
            [category],
        );

        let forums_data = result.rows;

        return {
            success: true,
            data: forums_data,
            message: 'Successfully retrieve forums data by category',
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

export default { newForum, getForumById, getForumByCategory, deleteForum };