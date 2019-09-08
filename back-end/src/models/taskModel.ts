import { client } from '../db';

export let getAllTask = async () => {
  let result = await client.query('SELECT * FROM tasks');
  return result.rows;
};

export let getTask = async (id: string) => {
  let result = await client.query({
    text: 'SELECT * from tasks where id=$1',
    values: [id],
  });

  return result.rows[0];
};
