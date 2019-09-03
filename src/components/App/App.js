import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import store from 'store';
import decode from 'jwt-decode';
import Routes from '../Routes/Routes';
import { Provider } from '../../utility/context';

const localUrl = 'http://localhost:5000/adverwriting/us-central1/api';
const publicUrl = 'https://us-central1-adverwriting.cloudfunctions.net/api';
const app = store.get('app');

axios.defaults.baseURL = localUrl;
if (app && app.token) {
  axios.defaults.headers.common.Authorization = `Bearer ${app.token}`;
}

axios.interceptors.response.use(
  response => response,
  error => {
    console.error(error.response);
    return error.response;
  }
);

axios.interceptors.request.use(
  async config => {
    if (config.headers.common.Authorization) {
      const token = config.headers.common.Authorization.split('Bearer ')[1];
      const tokenExp = decode(token).exp;
      const endpoint = config.url.split(config.baseURL)[0];
      if (
        tokenExp < new Date().getTime() / 1000 &&
        endpoint !== '/refresh-token'
      ) {
        const uid = store.get('app').user.credentials.userId;
        const tokenRes = await axios.post('/refresh-token', { uid });

        if (tokenRes.status >= 200 && tokenRes.status <= 299) {
          const newToken = `Bearer ${tokenRes.data.token}`;
          axios.defaults.headers.common.Authorization = newToken;
          config.headers.common.Authorization = newToken;
        }
      }
    }

    return config;
  },
  error => {
    console.error(error, 'Request Interceptor');
    return error.response;
  }
);

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#74b9ff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#74b9ff',
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
    <Provider>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Routes />
        </StylesProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
