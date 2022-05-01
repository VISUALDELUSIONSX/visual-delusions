import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseAuthProvider } from 'react-redux-firebase-auth';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import reactReduxFirebaseAuthConfig from './reactReduxFirebaseAuthConfig';
import { app } from './services/firebase';
import getStore from './store';

const { store, persistor } = getStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistor}>
        <ReactReduxFirebaseAuthProvider
          store={store}
          app={app}
          config={reactReduxFirebaseAuthConfig}
        >
          <App />
        </ReactReduxFirebaseAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

