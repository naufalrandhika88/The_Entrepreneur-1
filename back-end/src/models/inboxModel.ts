import { QueryResult } from 'pg';

import { getDB } from '../db';

async function addToInbox(id_user: number, message: string, date: string) {
  try {
    let db = await getDB();
    let values = [id_user, message, date];

    let result = await db.query(
      'INSERT INTO inbox (id_user, message, inbox_date) VALUES ($1, $2, $3) RETURNING *',
      values,
    );
    let inbox = result.rows[0];

    return {
      success: true,
      data: {
        id_user: inbox.id_user,
        message: inbox.message,
        inbox_date: inbox.inbox_date,
      },
      message: 'Successfully add to Inbox',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function getInbox(id: number) {
  let db = await getDB();

  let result: QueryResult = await db.query(
    'SELECT * FROM inbox where id_user=$1',
    [id],
  );

  return {
    success: true,
    data: [
      result.rows.map((item) => {
        return { message: item.message, inbox_date: item.inbox_date };
      }),
    ],
  };
}

export default { addToInbox, getInbox };
