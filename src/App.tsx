import { ThemeProvider, CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import Home from './pages/Home';
import { theme } from './theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
