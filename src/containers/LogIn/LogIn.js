import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogContent,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { DialogActions } from './styles';
import Typography from '../../components/Typography/Typography';
import { withContext } from '../../utility/context';
import HeaderImage from '../../assets/dialog-auth-header.png';

const LogIn = ({ contextHandler, context: { authDialog } }) => {
  const [errorState, setErrorState] = useState('');

  const dialogCloseHandler = () => contextHandler({ authDialog: '' });
  const dialogOpenHandler = () => contextHandler({ authDialog: 'login' });

  const loginHandler = async (data, { setSubmitting }) => {
    setSubmitting(true);
    dialogCloseHandler();
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
      dialogOpenHandler();
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

  return (
    <Dialog
      open={authDialog === 'login'}
      onClose={dialogCloseHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <img src={HeaderImage} />
      <DialogContent>
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
              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                >
                  Sign In
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default withContext(LogIn);
