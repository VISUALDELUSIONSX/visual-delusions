import { ThemeProvider, CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import Home from './pages/Home';
import { theme } from './theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Admin from './pages/Admin';
import ResetPasswordDialogContainer from './containers/ResetPasswordDialogContainer';
import ResetPasswordSentToastContainer from './containers/ResetPasswordSentToastContainer';
import SentEmailVerificationDialogContainer from './containers/SentEmailVerificationDialogContainer';
import SignInDialogContainer from './containers/SignInDialogContainer';
import SignUpDialogContainer from './containers/SignUpDialogContainer';
import VerifyEmailDialogContainer from './containers/VerifyEmailDialogContainer';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/admin' component={Admin} />
          </Switch>
        </main>

        <SignInDialogContainer />
        <SignUpDialogContainer />
        <ResetPasswordDialogContainer />
        <ResetPasswordSentToastContainer />
        <SentEmailVerificationDialogContainer />
        <VerifyEmailDialogContainer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
