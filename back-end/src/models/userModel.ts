import { getDB } from '../db';
import { UserSignUp } from '../types';
import { QueryResult } from 'pg';
import sjcl from 'sjcl';

async function userSignUp(userObject: UserSignUp) {
  let db = await getDB();
  let { email, username, first_name, last_name, password } = userObject;

  let users: QueryResult;
  users = await db.query('SELECT * FROM users where email = $1', [email]);
  if (users.rowCount !== 0) {
    return {
      success: false,
      data: {},
      message: 'Email already exist',
    };
  }

  users = await db.query('SELECT * FROM users where username = $1', [username]);
  if (users.rowCount !== 0) {
    return {
      success: false,
      data: {},
      message: 'Username already exist',
    };
  }

  let hash = sjcl.codec.hex.fromBits(
    sjcl.hash.sha256.hash(password + username.slice(0, 3)),
  );

  let encrypted = sjcl.encrypt(username.slice(-3), hash);

  let values = [
    email,
    username,
    first_name,
    last_name,
    encrypted,
    null,
    'Basic',
    'Other',
  ];

  let result: QueryResult = await db.query(
    'INSERT INTO users (email, username, first_name, last_name, password, avatar, membership, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values,
  );

  return {
    success: true,
    data: {
      email: result.rows[0].email,
      username: result.rows[0].username,
      first_name: result.rows[0].first_name,
      last_name: result.rows[0].last_name,
      avatar: result.rows[0].avatar,
      membership: result.rows[0].membership,
      gender: result.rows[0].gender,
    },
    message: `User ${username} has been added`,
  };
}

export default { userSignUp };
