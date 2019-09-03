import React from 'react';
import { Grid, Button } from '@material-ui/core';
import Typography from '../Typography/Typography';
import { Container } from './styles';

const ItemModalHeader = ({ title, author, onSwipe, handleLocalSwipe }) => (
  <Container container justify="space-between" alignItems="center">
    <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography gutter="0 0" color="bold" variant="h6">
        {title}
      </Typography>
      {author && (
        <Typography gutter="0 0" color="light" variant="caption">
          Completed By: {author}
        </Typography>
      )}
    </Grid>
    <Grid item>
      <Button
        color="primary"
        variant={handleLocalSwipe('contained', 'outlined')}
        style={{ marginRight: '5px' }}
        onClick={onSwipe}
      >
        Save{handleLocalSwipe('d', '')}
      </Button>
      <Button color="primary" variant="outlined">
        Like
      </Button>
    </Grid>
  </Container>
);

export default ItemModalHeader;
