import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseAuthProvider } from 'react-redux-firebase-auth';
import App from './App';
import reactReduxFirebaseAuthConfig from './reactReduxFirebaseAuthConfig';
import { app } from './services/firebase';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseAuthProvider
        store={store}
        app={app}
        config={reactReduxFirebaseAuthConfig}
      >
        <App />
      </ReactReduxFirebaseAuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
