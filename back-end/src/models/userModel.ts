import { QueryResult } from 'pg';
import sjcl from 'sjcl';
import jwt from 'jsonwebtoken';

import { getDB } from '../db';
import { UserSignUp, UserSignIn } from '../types';
import { API_SECRET } from '../constants';

async function userSignUp(userObject: UserSignUp) {
  try {
    let db = await getDB();
    let { email, first_name, last_name, password } = userObject;

    let user: QueryResult;
    user = await db.query('SELECT * FROM users where email = $1', [email]);
    if (user.rowCount !== 0) {
      return {
        success: false,
        data: {},
        message: 'Email already exist',
      };
    }

    let hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password + 'TES'));

    let encrypted = sjcl.encrypt('TES', hash);

    let values = [
      email,
      first_name,
      last_name,
      encrypted,
      null,
      'Basic',
      'Other',
    ];

    let result: QueryResult = await db.query(
      'INSERT INTO users (email, first_name, last_name, password, avatar, membership, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values,
    );

    return {
      success: true,
      data: {
        id: result.rows[0].id,
        email: result.rows[0].email,
        username: result.rows[0].username,
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        avatar: result.rows[0].avatar,
        membership: result.rows[0].membership,
        gender: result.rows[0].gender,
      },
      message: `User ${first_name} ${last_name} has been added`,
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function userSignIn(userObject: UserSignIn) {
  try {
    let db = await getDB();
    let { email, password } = userObject;

    let hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password + 'TES'));

    let result = await db.query('SELECT * FROM users where email = $1', [
      email,
    ]);

    if (result) {
      let decrypted = sjcl.decrypt('TES', result.rows[0].password);
      if (hash === decrypted) {
        let { id } = result.rows[0];

        let token = jwt.sign({ id }, API_SECRET);

        return {
          success: true,
          data: {
            id: result.rows[0].id,
            email: result.rows[0].email,
            username: result.rows[0].username,
            first_name: result.rows[0].first_name,
            last_name: result.rows[0].last_name,
            avatar: result.rows[0].avatar,
            membership: result.rows[0].membership,
            gender: result.rows[0].gender,
          },
          message: 'Login Success',
          token: token,
        };
      }
    }
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

export default { userSignUp, userSignIn };
