import React from 'react';
import Typography from '../Typography/Typography';

const BrandStory = ({ brandStory, title }) => (
  <div style={{ padding: '1rem' }}>
    <Typography color="bold" variant="h6" align="center" gutter="2rem 1rem">
      {title}'s Brand Story
    </Typography>
    <Typography gutter="2rem">{brandStory}</Typography>
  </div>
);

export default BrandStory;
