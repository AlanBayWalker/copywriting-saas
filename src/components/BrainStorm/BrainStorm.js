import React from 'react';
import { TextField } from '@material-ui/core';
import _ from 'lodash';
import { withContext } from '../../utility/context';

const BrainStorm = ({ context, contextHandler, projectId }) => {
  const [project] = context.user.projects.filter(
    ({ projectId: filteredProjectId }) => filteredProjectId === projectId
  );

  const workspaceHandler = (questionTitle, questionBody, index) => ({
    target: { value },
  }) => {
    const newUser = {
      ...context.user,
    };
    const projectIndex = _.findIndex(newUser.projects, project);

    newUser.projects[projectIndex].workSpace.splice(index, 1, {
      questionTitle,
      questionBody: value,
    });
    contextHandler({ user: newUser });
  };

  return (
    <>
      {project.workSpace.map(({ questionTitle, questionBody }, index) => (
        <TextField
          id="standard-multiline-flexible"
          label={questionTitle}
          multiline
          rows="7"
          rowsMax="10"
          value={questionBody}
          onChange={workspaceHandler(questionTitle, questionBody, index)}
          margin="normal"
          fullWidth
          key={questionTitle}
        />
      ))}
    </>
  );
};

export default withContext(BrainStorm);
