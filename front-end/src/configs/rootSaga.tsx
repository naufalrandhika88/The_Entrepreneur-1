import { Saga } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import signUpSagaWatcher from '../sagas/signUpSaga';

const rootSaga: Saga = function*() {
  yield fork(signUpSagaWatcher);
};

export default rootSaga;
