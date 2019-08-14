import React from 'react';
import MainNav from '../MainNav/MainNav';
import BrowseGrid from '../BrowseGrid/BrowseGrid';
import Typography from '../Typography/Typography';

const SelectedSwipeFolder = ({ location: { pathname } }) => (
  <div>
    <MainNav />
    <Typography variant="h3" align="center" gutter="4rem 0 0">
      Newspaper Copy Folder
    </Typography>
    <BrowseGrid path={pathname} />
  </div>
);

export default SelectedSwipeFolder;
