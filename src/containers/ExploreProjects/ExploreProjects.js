import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainNav from '../../components/MainNav/MainNav';
import BrowsingOptions from '../../components/BrowsingOptions/BrowsingOptions';
import BrowseGrid from '../../components/BrowseGrid/BrowseGrid';

const fetch = async (setItems, templateId) => {
  const items = await axios.get(`/${templateId ? 'projects' : 'templates'}`);
  if (items.status >= 200 && items.status <= 299) {
    setItems(items.data);
  }
};

const ExploreProjects = ({
  match: {
    params: { templateId },
  },
}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(setItems, templateId);
  }, [templateId]);

  return (
    <>
      <MainNav />
      <BrowsingOptions />
      <BrowseGrid items={items} />
    </>
  );
};

export default ExploreProjects;
