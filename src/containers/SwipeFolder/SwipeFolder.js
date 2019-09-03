import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import {
  Container,
  LinkCell,
  FolderIcon,
  MoreVertIcon,
  LoaderContainer,
  DeleteButton,
} from './styles';
import Typography from '../../components/Typography/Typography';
import MainNav from '../../components/MainNav/MainNav';
import { turnISOToDate } from '../../utility/helpers';
import history from '../../utility/history';

const linkHandler = (folderId, name, projects) => () =>
  history.push({
    pathname: `/swipe-folder/${folderId}`,
    state: { name, projects },
  });

const SwipeFolder = () => {
  const [folders, setFolders] = useState([]);
  const [menuState, setMenuState] = useState(null);
  const [dialogState, setDialogState] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState({});
  const [dialogError, setDialogError] = useState(null);

  const menuCloseHandler = () => setMenuState(null);
  const menuOpenHandler = ({ currentTarget }) => setMenuState(currentTarget);

  const dialogCloseHandler = () => setDialogState(null);
  const dialogOpenHandler = type => () => {
    setDialogState(type);
    menuCloseHandler();
  };

  const selectedFolderHandler = folder => e => {
    setSelectedFolder(folder);
    menuOpenHandler(e);
    setDialogError(null);
  };

  const submitHandler = async (values, { setSubmitting }) => {
    setSubmitting(false);
    dialogCloseHandler();

    const updatedFolder = await axios.put(
      `/swipe-folder/${selectedFolder.folderId}`,
      values
    );

    if (updatedFolder.status >= 200 && updatedFolder.status <= 299) {
      const index = folders.findIndex(
        ({ folderId }) => folderId === selectedFolder.folderId
      );
      const newFolder = {
        ...selectedFolder,
        ...values,
      };
      const newFolders = [...folders];
      newFolders.splice(index, 1, newFolder);
      setFolders(newFolders);
    } else {
      setDialogError(true);
      dialogOpenHandler('edit')();
    }
  };

  const validateHandler = values => {
    const errors = {};
    if (values.name.trim() === '') {
      errors.name = 'Must not be empty';
    }
    return errors;
  };

  useEffect(() => {
    axios.get('/swipe-folders').then(({ data }) => setFolders(data));
  }, []);

  return (
    <>
      <MainNav />
      <Container>
        {folders.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Item Count</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {folders.map(
                ({ name, description, projects, createdAt, folderId }) => (
                  <TableRow key={folderId}>
                    <LinkCell onClick={linkHandler(folderId, name, projects)}>
                      <Typography
                        variant="subtitle2"
                        display="inline"
                        color="primary"
                      >
                        <FolderIcon />
                        {name}
                      </Typography>
                    </LinkCell>
                    <TableCell>{projects.length}</TableCell>
                    <TableCell>{turnISOToDate(createdAt)}</TableCell>
                    <TableCell>
                      <Button
                        onClick={selectedFolderHandler({
                          name,
                          projects,
                          createdAt,
                          folderId,
                          description,
                        })}
                        aria-controls="swipe-folder-menu"
                        aria-haspopup="true"
                      >
                        <MoreVertIcon />
                      </Button>
                      <Menu
                        id="swipe-folder-menu"
                        anchorEl={menuState}
                        open={Boolean(menuState)}
                        onClose={menuCloseHandler}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <MenuItem onClick={dialogOpenHandler('edit')}>
                          <Typography>Edit Details</Typography>
                        </MenuItem>
                        <MenuItem onClick={dialogOpenHandler('delete')}>
                          <Typography color="error">Delete Folder</Typography>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        ) : (
          <LoaderContainer>
            <CircularProgress size={60} />
          </LoaderContainer>
        )}
      </Container>
      <Dialog
        open={dialogState === 'delete'}
        onClose={dialogCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          You're deleting {selectedFolder.name}
        </DialogTitle>
        <DialogContent>
          <Typography color="error">
            Deleting this folder will remove all Swiped Projects within it from
            your Swipe File.
          </Typography>
          <Typography color="error">Are you sure?</Typography>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between">
            <Button onClick={dialogCloseHandler}>Cancel</Button>
            <DeleteButton onClick={dialogCloseHandler} variant="contained">
              Delete Folder
            </DeleteButton>
          </Grid>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialogState === 'edit'}
        onClose={dialogCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          Edit {selectedFolder.name}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: selectedFolder.name,
              description: selectedFolder.description,
            }}
            validate={validateHandler}
            onSubmit={submitHandler}
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
                      multiline
                      fullWidth
                      label="Description"
                      margin="normal"
                      variant="outlined"
                      rows={5}
                    />
                  )}
                />
                {dialogError && (
                  <Typography color="error" align="center">
                    Something went wrong
                  </Typography>
                )}
                <DialogActions>
                  <Grid container justify="space-between">
                    <Button onClick={dialogCloseHandler}>Cancel</Button>
                    <Button
                      color="primary"
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                  </Grid>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SwipeFolder;
