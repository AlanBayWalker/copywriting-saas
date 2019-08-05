import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import BrowseItem from '../BrowseItem/BrowseItem';

const ItemRender = path => {
  const res = [];
  for (let i = 0; i < 6; i++) {
    res.push(<BrowseItem path={path} />);
  }
  return res;
};

const WorkspaceBrowser = ({ path }) => (
  <>
    <SearchBar />
    {ItemRender(path)}
  </>
);

export default WorkspaceBrowser;
