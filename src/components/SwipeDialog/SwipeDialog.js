import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableCell,
  TableBody,
  CircularProgress,
  Grid,
  TextField,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import Typography from '../Typography/Typography';
import { TableRow, LoaderContainer, FolderIcon } from './styles';
import { turnISOToDate } from '../../utility/helpers';

const SwipeDialog = ({
  projectId,
  status,
  openHandler,
  closeHandler,
  setSwipeStatus,
}) => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState('folders');

  const swipeProjectHandler = (folderId, projects) => async () => {
    if (!projects.includes(projectId)) {
      closeHandler();
      const res = await axios.post('/swipe-project', {
        folderId,
        projects: [...projects, projectId],
      });
      if (res.status >= 200 && res.status <= 299) {
        setSwipeStatus(true);
      } else {
        setError('Something went wrong');
        openHandler();
      }
    }
  };

  const changePageHandler = pageStr => () => {
    setPage(pageStr);
  };

  const createFolderHandler = async values => {
    const folder = await axios.post('/swipe-folder', values);
    if (folder.status >= 200 && folder.status <= 299) {
      const newFolders = [...folders, folder.data];
      setFolders(newFolders);
      changePageHandler('folders')();
    }
  };

  const validateFolder = values => {
    const errors = {};
    if (values.name.trim() === '') {
      errors.name = 'Must not be empty';
    }

    return errors;
  };

  useEffect(() => {
    if (status) {
      axios
        .get('/swipe-folders')
        .then(({ data }) => status && setFolders(data));
    }
  }, [status]);

  return (
    <Dialog
      open={status}
      onClose={closeHandler}
      aria-labelledby="swipe-dialog-title"
      aria-describedby="swipe-dialog-description"
    >
      {page === 'folders' ? (
        <>
          <DialogTitle id="swipe-dialog-title" align="center">
            Add this project to Swipe File
          </DialogTitle>
          <DialogContent>
            {folders.length ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Item Count</TableCell>
                    <TableCell>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {folders.map(({ name, projects, createdAt, folderId }) => (
                    <TableRow
                      key={folderId}
                      onClick={swipeProjectHandler(folderId, projects)}
                    >
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          display="inline"
                          color="primary"
                        >
                          <FolderIcon />
                          {name}
                        </Typography>
                      </TableCell>
                      <TableCell>{projects.length}</TableCell>
                      <TableCell>{turnISOToDate(createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <LoaderContainer>
                <CircularProgress />
              </LoaderContainer>
            )}
            {error && (
              <Typography color="error" variant="subtitle1" align="center">
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Grid container justify="space-between">
              <Grid item>
                <Button
                  onClick={changePageHandler('create-folder')}
                  color="primary"
                  type="button"
                >
                  Create new folder
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={closeHandler}
                  color="primary"
                  variant="contained"
                  type="button"
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle id="swipe-dialog-title" align="center">
            Create new folder
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{ name: '', description: '' }}
              validate={validateFolder}
              onSubmit={createFolderHandler}
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  <Field
                    name="name"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                        fullWidth
                        label="Name"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  />
                  <Field
                    name="description"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        fullWidth
                        label="Description"
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={5}
                      />
                    )}
                  />
                  {error && (
                    <Typography
                      color="error"
                      variant="subtitle1"
                      align="center"
                    >
                      {error}
                    </Typography>
                  )}
                  <Grid container justify="space-between">
                    <Button
                      onClick={closeHandler}
                      color="primary"
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Create Folder
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default SwipeDialog;
