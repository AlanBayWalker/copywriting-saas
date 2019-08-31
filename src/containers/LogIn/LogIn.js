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
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { FormContainer } from './styles';
import Typography from '../../components/Typography/Typography';
import { withContext } from '../../utility/context';

const LogIn = ({ contextHandler, context: { token } }) => {
  const [errorState, setErrorState] = useState('');
  const loginHandler = async (data, { setSubmitting }) => {
    setSubmitting(true);
    const tokenResponse = await axios.post('/login', data);

    if (tokenResponse.status >= 200 && tokenResponse.status <= 299) {
      contextHandler({ token: tokenResponse.data.token });
      const user = await axios.get('/user');

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
    return errors;
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
          LOG IN TO SWIPE CAMP
        </Typography>
        <Typography align="center" paragraph>
          Unlock your life one sale at the time!
        </Typography>
        <Formik
          initialValues={{ email: '', password: 'password' }}
          validate={validationHandler}
          onSubmit={loginHandler}
        >
          {({ isSubmitting, errors }) => (
            <Form>
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
                          <PersonIcon color="disabled" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
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
              {errorState && (
                <Typography color="#ff0000" variant="subtitle1">
                  {errorState}
                </Typography>
              )}
              <Typography color="light" align="right">
                Forgot your Password?
              </Typography>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default withContext(LogIn);
