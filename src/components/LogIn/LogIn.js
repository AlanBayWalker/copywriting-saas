import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { FormContainer } from './styles';
import Typography from '../Typography/Typography';
import { withContext } from '../../utility/context';
import passwordEnv from '../../utility/password';

const LogIn = ({ contextHandler, context: { isAuthenticated } }) => {
  const [usernameState, setUsernameState] = useState('admin');
  const usernameHandler = ({ target: { value } }) => setUsernameState(value);

  const [passwordState, setPasswordState] = useState('password');
  const passwordHandler = ({ target: { value } }) => setPasswordState(value);

  const loginHandler = () => {
    if (usernameState === 'admin' && passwordState === passwordEnv) {
      contextHandler({ isAuthenticated: true });
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <Container maxWidth="sm">
      <FormContainer>
        <Typography
          color="bold"
          variant="h4"
          component="h1"
          align="center"
          paragraph
        >
          LOG IN TO SWIPE CAMP
        </Typography>
        <Typography align="center" paragraph>
          Unlock your life one sale at the time!
        </Typography>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="disabled" />
              </InputAdornment>
            ),
          }}
          value={usernameState}
          onChange={usernameHandler}
        />
        <TextField
          type="password"
          fullWidth
          label="Password"
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color="disabled" />
              </InputAdornment>
            ),
          }}
          value={passwordState}
          onChange={passwordHandler}
        />
        <Typography color="light" align="right">
          Forgot your Password?
        </Typography>
        <Button color="primary" variant="contained" onClick={loginHandler}>
          Log In
        </Button>
      </FormContainer>
    </Container>
  );
};

export default withContext(LogIn);
