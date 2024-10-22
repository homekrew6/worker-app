import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import * as firebase from 'firebase';
import configureStore from './js/store/configureStore'
import App from './App';

const config = {
  apiKey: "AIzaSyCnS3M8ZZBYRH4QubDH3OJPKSgk-03Nm9w",
  authDomain: "krew-user-app.firebaseapp.com",
  databaseURL: "https://krew-user-app.firebaseio.com",
  storageBucket: "krew-user-app.appspot.com"
};
const firebaseApp=firebase.initializeApp(config);

const store = configureStore()
const ReduxApp = () =>(
  <Provider store={store}>
    <App/>
  </Provider>
)
AppRegistry.registerComponent('KrewWorkerApp', () => ReduxApp);
