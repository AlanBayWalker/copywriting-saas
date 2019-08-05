import React from 'react';
import WorkspaceBar from '../WorkspaceBar/WorkspaceBar';
import ProjectCanvas from '../ProjectCanvas/ProjectCanvas';

const ProjectWorkspace = ({ location: { pathname } }) => (
  <div style={{ display: 'flex' }}>
    <ProjectCanvas />
    <WorkspaceBar path={pathname} />
  </div>
);

export default ProjectWorkspace;
