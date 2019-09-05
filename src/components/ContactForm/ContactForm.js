import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import Typography from '../Typography/Typography';
import { withContext } from '../../utility/context';

const ContactForm = ({
  context: {
    token,
    contactDialog,
    user: { credentials },
  },
  contextHandler,
}) => {
  const [errorState, setErrorState] = useState(null);

  const dialogCloseHandler = () => contextHandler({ contactDialog: false });
  const dialogOpenHandler = () => contextHandler({ contactDialog: true });

  const sendMessageHandler = async (data, { setSubmitting }) => {
    setSubmitting(true);
    dialogCloseHandler();
    const contactResponse = await axios.post('/contact', data);

    if (contactResponse.status >= 200 && contactResponse.status <= 299) {
      console.log(contactResponse);
    } else {
      setSubmitting(false);
      setErrorState(contactResponse.data.general);
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

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.subject) {
      errors.subject = 'Required';
    }

    if (!values.message) {
      errors.message = 'Required';
    }

    return errors;
  };

  const intialValues = {
    email: credentials && credentials.email ? credentials.email : '',
    name: credentials && credentials.name ? credentials.name : '',
    subject: '',
    message: '',
  };

  return (
    <Dialog
      open={contactDialog}
      onClose={dialogCloseHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" align="center">
        <Typography variant="h5">Questions, Comments, or Concerns?</Typography>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={intialValues}
          validate={validationHandler}
          onSubmit={sendMessageHandler}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {!token && (
                <>
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
                      />
                    )}
                  />
                  <Field
                    name="email"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        fullWidth
                        label="Email Address"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  />
                </>
              )}
              <Field
                name="subject"
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors.subject)}
                    helperText={errors.subject}
                    fullWidth
                    label="Subject"
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
              <Field
                name="message"
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                    fullWidth
                    label="Message"
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={5}
                  />
                )}
              />
              {errorState && (
                <Typography color="#ff0000" variant="subtitle1">
                  {errorState}
                </Typography>
              )}
              <DialogActions>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  fullWidth
                >
                  Send Message
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default withContext(ContactForm);
