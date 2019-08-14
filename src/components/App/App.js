import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Routes from '../Routes/Routes';
import { Provider } from '../../utility/context';

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
