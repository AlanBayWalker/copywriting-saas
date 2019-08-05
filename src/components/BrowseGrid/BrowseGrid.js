import React from 'react';
import { Grid } from '@material-ui/core';
import BrowseItem from '../BrowseItem/BrowseItem';

const GridItem = ({ path }) => (
  <Grid item xs={3}>
    <BrowseItem path={path} />
  </Grid>
);

const generateList = (items, path) => {
  const list = [];
  for (let i = 0; i < items; i++) {
    list.push(<GridItem path={path} />);
  }
  return list;
};

const BrowseGrid = ({ path }) => (
  <Grid
    container
    justify="space-between"
    spacing={8}
    style={{ margin: 0, padding: '2rem 0', maxWidth: '100%' }}
  >
    {generateList(12, path)}
  </Grid>
);

export default BrowseGrid;
