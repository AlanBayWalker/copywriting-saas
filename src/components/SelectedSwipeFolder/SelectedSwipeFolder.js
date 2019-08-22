import React from 'react';
import MainNav from '../MainNav/MainNav';
import BrowseGrid from '../BrowseGrid/BrowseGrid';
import Typography from '../Typography/Typography';

const SelectedSwipeFolder = ({ location: { pathname } }) => (
  <>
    <MainNav />
    <Typography variant="h3" align="center" gutter="2rem">
      Newspaper Copy Folder
    </Typography>
    <BrowseGrid path={pathname} />
  </>
);

export default SelectedSwipeFolder;
