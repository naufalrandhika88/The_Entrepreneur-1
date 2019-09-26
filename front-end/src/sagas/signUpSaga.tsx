import { call, put, takeLatest } from 'redux-saga/effects';

import { API_HOST } from '../constants/api';
import { SignUpAction } from '../types/signUpSceneType';
import { createNavigationHelper } from '../helpers/NavigationHelper';

export default function* signUpSagaWatcher(): any {
  yield takeLatest('REGISTER_REQUESTED', signUpRequest);
}

function* signUpRequest(action: SignUpAction) {
  if (action.type === 'REGISTER_REQUESTED') {
    let { email, password, _navigator } = action;

    let url = `${API_HOST}/api/auth/sign-up`;
    let data = {
      email,
      first_name: 'Malvin',
      last_name: 'Hariyanto',
      password,
    };
    let response = yield call(fetch, url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let result = yield response.json();

    console.log(result);
    if (result.success) {
      let NavigationHelper = createNavigationHelper(_navigator);
      yield put({ type: 'REGISTER_SUCCEED', message: result.message });
      NavigationHelper.navigate('Welcome');
    } else {
      yield put({ type: 'REGISTER_FAILED', message: result.message });
    }
  }
}
