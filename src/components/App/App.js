import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import store from 'store';
import Routes from '../Routes/Routes';
import { Provider } from '../../utility/context';

const localUrl = 'http://localhost:5000/adverwriting/us-central1/api';
const publicUrl = 'https://us-central1-adverwriting.cloudfunctions.net/api';
const app = store.get('app');

axios.defaults.baseURL = localUrl;
axios.defaults.headers.common.Authorization = app ? `Bearer ${app.token}` : '';

axios.interceptors.response.use(
  response => {
    // Do something with response data
    console.log(response);
    return response;
  },
  error => {
    // Do something with response error
    console.log(error.response);
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
