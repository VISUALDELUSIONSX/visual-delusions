import {
  ThemeProvider,
  CssBaseline,
  CircularProgress,
} from '@material-ui/core';
import Header from './components/Header';
import Home from './pages/Home';
import { theme } from './theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { app } from './services/firebase';
import PrivateRoute from './components/PrivateRoute';
import Dialogs from './containers/Dialogs';
import Shop from './pages/Shop';
import ScrollToTop from './components/ScrollToTop';
import { FirestoreTextEditorProvider } from 'firestore-text-editor';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import { useAppSelector } from './hooks/useAppSelector';
import ShopItem from './pages/ShopItem';

function App() {
  const isAdmin = useAppSelector((state) => state.auth.user?.isAdmin);

  return (
    <Router>
      <FirestoreTextEditorProvider
        app={app}
        editIconStyle={{ color: '#aaa' }}
        saveIconStyle={{ color: '#aaa' }}
        cancelIconStyle={{ color: '#aaa' }}
        loader={<CircularProgress />}
        isEditable={!!isAdmin}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Dialogs />
          <Header />
          <main>
            <ScrollToTop />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/about' component={About} />
              <Route exact path='/faq' component={FAQ} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/shop' component={Shop} />
              <Route exact path='/shop/:category' component={Shop} />
              <Route
                exact
                path='/shop/:category/:shopItemId'
                component={ShopItem}
              />
              <PrivateRoute exact path='/admin' component={Admin} />
            </Switch>
          </main>
        </ThemeProvider>
      </FirestoreTextEditorProvider>
    </Router>
  );
}

export default App;

