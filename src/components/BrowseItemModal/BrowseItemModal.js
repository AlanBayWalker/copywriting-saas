import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Chip,
  DialogActions,
  Button,
} from '@material-ui/core';
import Link from '../Link/Link';
import ItemModalHeader from '../ItemModalHeader/ItemModalHeader';
import Thumbnail from '../../assets/item-thumbnail.png';

const categories = () => {
  const list = [
    'Medical',
    'Health',
    'Finance',
    'Tech',
    'Manufacturing',
    'Marketing',
  ];

  return list.map(itemName => (
    <Chip
      color="primary"
      label={itemName}
      variant="outlined"
      style={{ margin: '0 10px 2rem 0' }}
    />
  ));
};

const BrowseItemModal = ({ dialogStatus, dialogCloseHandler, path }) => {
  const pathHandler = (originalProject, cloneProject) =>
    path.split('/').length < 3 ? originalProject : cloneProject;

  return (
    <Dialog
      open={dialogStatus}
      onClose={dialogCloseHandler}
      aria-labelledby="form-dialog-title"
    >
      <ItemModalHeader title="Project Title" />
      <DialogContent>
        <img
          src={Thumbnail}
          alt="Project Title"
          style={{ height: 'auto', marginBottom: '2rem', width: '100%' }}
        />
        {categories()}
        <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: 'space-between',
          padding: '0 1.4rem 1.2rem 1rem',
        }}
      >
        <Link to="/explore/1">
          <Button color="primary" variant="outlined">
            {pathHandler('Browse Copies', 'Start Original')}
          </Button>
        </Link>
        <Link to="/workspace">
          <Button color="primary" variant="outlined">
            {pathHandler('Start', 'View')}
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default BrowseItemModal;
