import React from 'react';
import { Grid, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Typography from '../Typography/Typography';
import { Container } from './styles';

const ItemModalHeader = ({ title }) => (
  <Container container alignItems="center">
    <Grid item xs={9} style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography gutter="0 0" color="bold" variant="h6">
        {title}
      </Typography>
      <Typography gutter="0 0" color="light" variant="caption">
        Created By: AlanBayWalker
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Button color="primary" variant="outlined" style={{ marginRight: '5px' }}>
        <BookmarkIcon />
      </Button>
      <Button color="primary" variant="outlined">
        <FavoriteIcon />
      </Button>
    </Grid>
  </Container>
);

export default ItemModalHeader;
