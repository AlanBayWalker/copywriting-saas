import React, { useEffect, useState } from 'react';
import MainNav from '../../components/MainNav/MainNav';
import BrowsingOptions from '../../components/BrowsingOptions/BrowsingOptions';
import BrowseGrid from '../../components/BrowseGrid/BrowseGrid';
import axios from '../../utility/axios';

const fetch = async (setItems, templateId) => {
  const templates = await axios({
    method: 'get',
    endPoint: `/${templateId ? 'projects' : 'templates'}`,
    token: true,
  });
  setItems(templates);
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
    <div>
      <MainNav />
      <BrowsingOptions />
      <BrowseGrid items={items} />
    </div>
  );
};

export default ExploreProjects;
