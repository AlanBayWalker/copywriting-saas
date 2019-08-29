import React from 'react';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Container } from './styles';
import BrowseItem from '../BrowseItem/BrowseItem';

const projectsRender = items => {
  if (items && items.length) {
    return items.map(config => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={config.title}>
        <BrowseItem {...config} />
      </Grid>
    ));
  }
  return _.times(8, i => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
      <Skeleton variant="rect" width={350} height={270} />
    </Grid>
  ));
};

const BrowseGrid = ({ items }) => (
  <Container container justify="space-between" spacing={8}>
    {projectsRender(items)}
  </Container>
);

export default BrowseGrid;
