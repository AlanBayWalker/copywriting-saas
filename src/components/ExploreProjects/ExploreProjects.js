import React from 'react';
import MainNav from '../MainNav/MainNav';
import BrowsingOptions from '../BrowsingOptions/BrowsingOptions';
import BrowseGrid from '../BrowseGrid/BrowseGrid';

const ExploreProjects = ({ location: { pathname } }) => (
  <div>
    <MainNav />
    <BrowsingOptions />
    <BrowseGrid path={pathname} />
  </div>
);

export default ExploreProjects;
