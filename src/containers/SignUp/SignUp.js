import React from 'react';
import {
  Dialog,
  DialogContent,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { DialogHeader, DialogActions } from './styles';
import Typography from '../../components/Typography/Typography';
import { withContext } from '../../utility/context';
import history from '../../utility/history';

const SignUp = ({ contextHandler, context: { authDialog } }) => {
  const dialogCloseHandler = () => contextHandler({ authDialog: '' });
  const dialogOpenHandler = authDialog => () => contextHandler({ authDialog });

  const signupHandler = async (data, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    const tokenResponse = await axios.post('/signup', data);

    if (tokenResponse.status >= 200 && tokenResponse.status <= 299) {
      contextHandler({
        token: tokenResponse.data.token,
        user: tokenResponse.data.user,
        authDialog: '',
      });
      history.push('/user-details');
    } else {
      setSubmitting(false);
      setErrors(tokenResponse.data);
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

    if (!values.name) {
      errors.name = 'Required';
    }

    return errors;
  };

  const initialValues = {
    email: '',
    password: '',
    username: '',
    name: '',
  };

  return (
    <Dialog
      open={authDialog === 'signup'}
      onClose={dialogCloseHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogHeader>
        <Typography
          color="bold"
          variant="h4"
          component="h1"
          align="center"
          paragraph
        >
          SIGN UP TO SWIPE CLOUD
        </Typography>
        <Typography align="center" paragraph>
          Unlock your life one sale at the time!
        </Typography>
      </DialogHeader>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validate={validationHandler}
          onSubmit={signupHandler}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Grid container spacing={2}>
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
              {errors.general && (
                <Typography color="#ff0000" variant="subtitle1">
                  {errors.general}
                </Typography>
              )}
              <Typography
                color="light"
                align="right"
                onClick={dialogOpenHandler('login')}
                style={{ cursor: 'pointer' }}
              >
                Already have an account?
              </Typography>
              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                >
                  Create Account
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default withContext(SignUp);
