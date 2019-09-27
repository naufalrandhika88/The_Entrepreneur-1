import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppNavigator from './configs/routes/Navigator';
import createDataStore from './configs/createDataStore';

let store = createDataStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
