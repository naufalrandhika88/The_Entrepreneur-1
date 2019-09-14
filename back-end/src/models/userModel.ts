import { QueryResult } from 'pg';
import sjcl from 'sjcl';
import jwt from 'jsonwebtoken';

import { getDB } from '../db';
import {
  UserSignUp,
  UserSignIn,
  DecodedObject,
  ReqEditProfileObject,
} from '../types';
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

    if (result.rows[0]) {
      let decrypted = sjcl.decrypt('TES', result.rows[0].password);
      if (hash === decrypted) {
        let { id } = result.rows[0];

        let token = jwt.sign({ id }, API_SECRET);

        return {
          success: true,
          data: {
            id: result.rows[0].id,
            email: result.rows[0].email,
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
    } else {
      return {
        success: false,
        data: {},
        message: 'Incorrect email or password.',
      };
    }
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function getUserData(decoded: DecodedObject) {
  try {
    let db = await getDB();
    let { id: myId } = decoded;

    let result = await db.query('SELECT * FROM users where id=$1', [myId]);

    if (!result.rows) {
      return {
        success: false,
        data: {},
        message: 'Cannot get user with this ID',
      };
    }

    return {
      success: true,
      data: {
        id: result.rows[0].id,
        email: result.rows[0].email,
        first_name: result.rows[0].first_name,
        last_name: result.rows[0].last_name,
        avatar: result.rows[0].avatar,
        membership: result.rows[0].membership,
        gender: result.rows[0].gender,
      },
      message: "Successfully retrieve user's profile",
    };
  } catch (e) {
    return { success: false, data: 'ANJING', message: String(e) };
  }
}

async function updateUser(
  editReq: ReqEditProfileObject,
  decoded: DecodedObject,
) {
  try {
    let { avatar, first_name, last_name, gender } = editReq;
    let { id: myId } = decoded;

    let db = await getDB();

    let result = await db.query(
      'UPDATE users SET avatar=$1, first_name=$2, last_name=$3, gender=$4 WHERE id=$5',
      [avatar, first_name, last_name, gender, myId],
    );

    let userData = await getUserData(decoded);

    return {
      success: true,
      data: userData.data,
      message: 'User profile has been changed',
    };
  } catch (e) {
    return { success: false, data: {}, message: String(e) };
  }
}

export default { userSignUp, userSignIn, getUserData, updateUser };
