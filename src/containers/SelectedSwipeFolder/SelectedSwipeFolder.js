import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainNav from '../../components/MainNav/MainNav';
import BrowseGrid from '../../components/BrowseGrid/BrowseGrid';
import Typography from '../../components/Typography/Typography';

const SelectedSwipeFolder = ({
  location: { state },
  match: {
    params: { folderId },
  },
}) => {
  const [projects, setProjects] = useState([]);
  const unswipeHandler = projectId => {
    const newProjects = projects.filter(
      project => project.projectId !== projectId
    );
    setProjects(newProjects);
  };

  useEffect(() => {
    if (state) {
      axios
        .post(`/swipe-folder/${folderId}`, { projects: state.projects })
        .then(folders => setProjects(folders.data));
    }
  }, [folderId, state]);
  return (
    <>
      <MainNav />
      <Typography variant="h3" align="center" gutter="2rem">
        {state.name}
      </Typography>
      <BrowseGrid items={projects} unswipeHandler={unswipeHandler} />
    </>
  );
};

export default SelectedSwipeFolder;
