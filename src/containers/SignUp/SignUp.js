import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Formik, Form, Field } from 'formik';
import Link from '../../components/Link/Link';
import axios from '../../utility/axios';
import { FormContainer } from './styles';
import Typography from '../../components/Typography/Typography';
import { withContext } from '../../utility/context';

const SignUp = ({ contextHandler, context: { token } }) => {
  const [errorState, setErrorState] = useState('');
  const signupHandler = async (data, { setSubmitting }) => {
    setSubmitting(true);
    const tokenResponse = await axios({
      method: 'post',
      endPoint: '/signup',
      data,
    });

    if (tokenResponse.status >= 200 && tokenResponse.status <= 299) {
      contextHandler({ token: tokenResponse.data.token });
      const user = await axios({
        method: 'get',
        endPoint: '/user',
        token: true,
      });

      if (user.status >= 200 && user.status <= 299) {
        contextHandler({ user: user.data });
      }
    } else {
      setSubmitting(false);
      setErrorState(tokenResponse.data.general);
    }
  };

  const validationHandler = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.username) {
      errors.username = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.location) {
      errors.location = 'Required';
    }

    if (!values.bio) {
      errors.bio = 'Required';
    }
    return errors;
  };

  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    location: '',
    bio: '',
  };

  if (token) return <Redirect to="/" />;

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
          SIGN UP TO SWIPE CAMP
        </Typography>
        <Typography align="center" paragraph>
          Unlock your life one sale at the time!
        </Typography>
        <Formik
          initialValues={initialValues}
          validate={validationHandler}
          onSubmit={signupHandler}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    name="email"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        fullWidth
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    name="username"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.username)}
                        helperText={errors.username}
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
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    name="password"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    name="confirmPassword"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                        type="password"
                        fullWidth
                        label="Confirm Password"
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
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    name="name"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        fullWidth
                        label="First and last name"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <InsertEmoticonIcon color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    name="location"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.location)}
                        helperText={errors.location}
                        fullWidth
                        label="Location"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <GpsFixedIcon color="disabled" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="bio"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.bio)}
                        helperText={errors.bio}
                        fullWidth
                        multiline
                        rows={5}
                        label="Bio"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              {errorState && (
                <Typography color="#ff0000" variant="subtitle">
                  {errorState}
                </Typography>
              )}
              <Link to="/login">
                <Typography color="light" align="right">
                  Already have an account?
                </Typography>
              </Link>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default withContext(SignUp);
