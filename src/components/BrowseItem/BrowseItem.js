import React, { useState } from 'react';
import { Grid, CardActionArea, Button } from '@material-ui/core';
import { CardContainer, CardImage, CardInfoBar } from './styles';
import Typography from '../Typography/Typography';
import BrowseItemModal from '../BrowseItemModal/BrowseItemModal';

const BrowseItem = item => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const dialogCloseHandler = () => setDialogStatus(false);
  const dialogOpenHandler = () => setDialogStatus(true);

  return (
    <>
      <CardContainer onClick={dialogOpenHandler}>
        <CardActionArea>
          <CardImage image={item.thumbnail} title={item.title} />
        </CardActionArea>
        <CardInfoBar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography color="bold" gutter="0 0">
                {item.title}
              </Typography>
              {item.author && (
                <Typography gutter="0 0" variant="caption">
                  Completed By: {item.author}
                </Typography>
              )}
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
        {...item}
      />
    </>
  );
};

export default BrowseItem;
