import React from 'react';
import { TextField } from '@material-ui/core';

const BrainStorm = () => (
  <>
    <TextField
      id="standard-multiline-flexible"
      label="Question goes here!"
      multiline
      rows="5"
      rowsMax="10"
      value=""
      onChange={() => null}
      margin="normal"
      fullWidth
    />
    <TextField
      id="standard-multiline-flexible"
      label="Question goes here"
      multiline
      rows="5"
      rowsMax="10"
      value=""
      onChange={() => null}
      margin="normal"
      fullWidth
    />
    <TextField
      id="standard-multiline-flexible"
      label="Question goes here"
      multiline
      rows="5"
      rowsMax="10"
      value=""
      onChange={() => null}
      margin="normal"
      fullWidth
    />

    <TextField
      id="standard-multiline-flexible"
      label="Final Header"
      value=""
      onChange={() => null}
      margin="normal"
    />
  </>
);

export default BrainStorm;
