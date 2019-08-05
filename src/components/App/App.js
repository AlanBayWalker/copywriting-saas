import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ExploreProjects from '../ExploreProjects/ExploreProjects';
import ProjectWorkspace from '../ProjectWorkspace/ProjectWorkspace';
import UserProfile from '../UserProfile/UserProfile';
import LogIn from '../LogIn/LogIn';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#2ecc71',
      contrastText: '#fff',
    },
    secondary: {
      main: '#27ae60',
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider className="App">
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <CssBaseline />
            {/* <Redirect from="/" to="/explore" /> */}
            <Route path="/explore" component={ExploreProjects} />
            <Route path="/workspace" component={ProjectWorkspace} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/profile" component={UserProfile} />
          </StylesProvider>
        </ThemeProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
