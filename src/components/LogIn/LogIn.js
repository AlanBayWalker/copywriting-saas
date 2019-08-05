import React from 'react';
import {
  Container,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { FormContainer } from './styles';
import Link from '../Link/Link';
import Typography from '../Typography/Typography';

const LogIn = () => (
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
      />
      <TextField
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
      />
      <Typography color="light" align="right">
        Forgot your Password?
      </Typography>
      <Link to="/explore">
        <Button color="primary" variant="contained">
          Log In
        </Button>
      </Link>
    </FormContainer>
  </Container>
);

export default LogIn;
