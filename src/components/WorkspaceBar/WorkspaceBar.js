import React from 'react';
import { Container } from './styles';
import SelectedProject from '../SelectedProject/SelectedProject';
import WorkspaceBrowser from '../WorkspaceBrowser/WorkspaceBrowser';

const WorkspaceBar = ({ path }) => {
  const pathHandler = (originalProject, cloneProject) =>
    path.split('/').length < 3 ? originalProject : cloneProject;

  return (
    <Container>
      {pathHandler(<SelectedProject />, <WorkspaceBrowser path={path} />)}
    </Container>
  );
};

export default WorkspaceBar;
