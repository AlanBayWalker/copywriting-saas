import React from 'react';
import { Container } from './styles';
import SelectedProject from '../SelectedProject/SelectedProject';
import WorkspaceBrowser from '../WorkspaceBrowser/WorkspaceBrowser';

const WorkspaceBar = ({ path }) => {
  const pathHandler = (originalProject, cloneProject) =>
    path.split('/')[2] === 'browse' ? cloneProject : originalProject;

  return (
    <Container>
      {pathHandler(<SelectedProject />, <WorkspaceBrowser path={path} />)}
    </Container>
  );
};

export default WorkspaceBar;
