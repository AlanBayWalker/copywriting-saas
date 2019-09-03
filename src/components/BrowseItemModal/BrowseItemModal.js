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
import { withContext } from '../../utility/context';

const BrowseItemModal = ({
  dialogStatus,
  dialogCloseHandler,
  author,
  title,
  thumbnail,
  description,
  categories,
  templateId,
  projectId,
  onSwipe,
  handleLocalSwipe,
  context: { user },
}) => {
  const pathHandler = (originalProject, cloneProject) =>
    projectId ? cloneProject : originalProject;
  const hasProject = () => {
    const res =
      user.projects &&
      user.projects.filter(project => project.templateId === templateId);
    return res && res.length > 0 ? 'Continue' : 'Start';
  };

  return (
    <Dialog
      open={dialogStatus}
      onClose={dialogCloseHandler}
      aria-labelledby="form-dialog-title"
    >
      <ItemModalHeader
        title={title}
        author={author}
        onSwipe={onSwipe}
        handleLocalSwipe={handleLocalSwipe}
      />
      <DialogContent>
        <img
          src={thumbnail}
          alt={title}
          style={{ height: 'auto', marginBottom: '2rem', width: '100%' }}
        />
        {categories.map(name => (
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
        {pathHandler(
          <Link
            to={{
              pathname: `/explore/${projectId || templateId}`,
              state: {
                type: projectId ? 'projectId' : 'templateId',
              },
            }}
            onClick={dialogCloseHandler}
          >
            <Button color="primary" variant="outlined">
              Browse Copies
            </Button>
          </Link>,
          <Link
            to={{
              pathname: `/workspace/${templateId}`,
              state: {
                type: 'templateId',
              },
            }}
            onClick={dialogCloseHandler}
          >
            <Button color="primary" variant="outlined">
              {hasProject()} Project
            </Button>
          </Link>
        )}
        {pathHandler(
          <Link
            to={{
              pathname: `/workspace/${projectId || templateId}`,
              state: {
                type: projectId ? 'projectId' : 'templateId',
              },
            }}
          >
            <Button color="primary" variant="outlined">
              {hasProject()} Project
            </Button>
          </Link>,
          <Link
            to={{
              pathname: `/workspace/${projectId}`,
              state: {
                type: 'projectId',
              },
            }}
          >
            <Button color="primary" variant="outlined">
              View
            </Button>
          </Link>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default withContext(BrowseItemModal);
