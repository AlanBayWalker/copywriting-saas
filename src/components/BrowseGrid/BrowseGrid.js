import React from 'react';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import BrowseItem from '../BrowseItem/BrowseItem';
import projects from '../../utility/projects';

const projectsRender = path =>
  projects.map(config => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={config.title}>
      <BrowseItem path={path} {...config} />
    </Grid>
  ));

const projectCopyRender = path => {
  const linkMatch = path.split('/')[2];
  const [config] = projects.filter(({ link }) => link === linkMatch);
  const result = [];
  _.times(8, () => {
    result.push(
      <Grid item xs={3}>
        <BrowseItem path={path} {...config} />
      </Grid>
    );
  });
  return result;
};

const BrowseGrid = ({ path }) => (
  <Grid
    container
    justify="space-between"
    spacing={8}
    style={{
      backgroundColor: '#f4f4f4',
      margin: 0,
      padding: '2rem 0',
      maxWidth: '100%',
    }}
  >
    {path.split('/').length < 3
      ? projectsRender(path)
      : projectCopyRender(path)}
  </Grid>
);

export default BrowseGrid;
