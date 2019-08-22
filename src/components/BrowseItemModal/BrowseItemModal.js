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

const BrowseItemModal = ({
  dialogStatus,
  dialogCloseHandler,
  path,
  title,
  thumbnail,
  description,
  link,
  categories,
}) => {
  const pathHandler = (originalProject, cloneProject) =>
    path.split('/')[2] === 'browse' ? cloneProject : originalProject;

  return (
    <Dialog
      open={dialogStatus}
      onClose={dialogCloseHandler}
      aria-labelledby="form-dialog-title"
    >
      <ItemModalHeader title={title} />
      <DialogContent>
        <img
          src={thumbnail}
          alt={title}
          style={{ height: 'auto', marginBottom: '2rem', width: '100%' }}
        />
        {categories &&
          categories.map(name => (
            <Chip
              key={name}
              color="primary"
              label={name}
              variant="outlined"
              style={{ margin: '0 10px 2rem 0' }}
            />
          ))}
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: 'space-between',
          padding: '0 1.4rem 1.2rem 1rem',
        }}
      >
        <Link to={`/explore/${link}`} onClick={dialogCloseHandler}>
          <Button color="primary" variant="outlined">
            {pathHandler('Browse Copies', 'Start Original')}
          </Button>
        </Link>
        <Link to={`/workspace/${link}`}>
          <Button color="primary" variant="outlined">
            {pathHandler('Start', 'View')}
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default BrowseItemModal;
