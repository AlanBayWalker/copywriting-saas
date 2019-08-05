import React, { useState } from 'react';
import { Grid, CardActionArea, Button } from '@material-ui/core';
import { CardContainer, CardImage, CardInfoBar } from './styles';
import Typography from '../Typography/Typography';
import BrowseItemModal from '../BrowseItemModal/BrowseItemModal';
import Thumbnail from '../../assets/item-thumbnail.png';

const BrowseItem = ({ path }) => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const dialogCloseHandler = () => setDialogStatus(false);
  const dialogOpenHandler = () => setDialogStatus(true);

  const pathHandler = (originalProject, cloneProject) =>
    path.split('/').length < 3 ? originalProject : cloneProject;

  return (
    <>
      <CardContainer onClick={dialogOpenHandler}>
        <CardActionArea>
          <CardImage image={Thumbnail} title="Project Name" />
        </CardActionArea>
        <CardInfoBar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography color="bold" gutter="0 0" variant="">
                Project Title
              </Typography>
              <Typography texColor="light" gutter="0 0" variant="caption">
                {pathHandler('Created', 'Cloned')} By: AlanBayWalker
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                style={{ marginRight: '10px' }}
              >
                Save
              </Button>
              <Button variant="outlined" size="small" color="primary">
                Like
              </Button>
            </Grid>
          </Grid>
        </CardInfoBar>
      </CardContainer>
      <BrowseItemModal
        dialogStatus={dialogStatus}
        dialogCloseHandler={dialogCloseHandler}
        path={path}
      />
    </>
  );
};

export default BrowseItem;
