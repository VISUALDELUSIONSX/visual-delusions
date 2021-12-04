import { ThemeProvider, CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import Home from './pages/Home';
import { theme } from './theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Login from './pages/Login';
import store from './store';
import { ReactReduxFirebaseAuthProvider } from 'react-redux-firebase-auth';
import { app } from './services/firebase';
import reactReduxFirebaseAuthConfig from './reactReduxFirebaseAuthConfig';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <ReactReduxFirebaseAuthProvider
          store={store}
          app={app}
          config={reactReduxFirebaseAuthConfig}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Header />
            <main>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute exact path='/admin' component={Admin} />
              </Switch>
            </main>
          </ThemeProvider>
        </ReactReduxFirebaseAuthProvider>
      </Provider>
    </Router>
  );
}

export default App;
