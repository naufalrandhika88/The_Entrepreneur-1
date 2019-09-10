import { getDB } from '../db';
import { UserSignUp } from '../types';

// export let getAllUsers = async () => {
//   let db = await getDB();

//   let result = await db.query('SELECT * FROM users');
//   return result.rows;
// };

async function userSignUp(userObject: UserSignUp) {
  let db = await getDB();
  let { email, username, first_name, last_name, password } = userObject;

  let values = [
    email,
    username,
    first_name,
    last_name,
    password,
    null,
    'Basic',
    'Other',
  ];

  let result = await db.query(
    'INSERT INTO users (email, username, first_name, last_name, password, avatar, membership, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values,
  );

  return 'Success sign up';
}

export default { userSignUp };
