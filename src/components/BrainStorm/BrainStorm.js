import React from 'react';
import { TextField } from '@material-ui/core';

const BrainStorm = () => (
  <>
    <TextField
      id="standard-multiline-flexible"
      label="Who is the target audience?"
      multiline
      rows="7"
      rowsMax="10"
      value=""
      onChange={() => null}
      margin="normal"
      fullWidth
    />
    <TextField
      id="standard-multiline-flexible"
      label="What makes this special?"
      multiline
      rows="7"
      rowsMax="10"
      value=""
      onChange={() => null}
      margin="normal"
      fullWidth
    />
    <TextField
      id="standard-multiline-flexible"
      label="What are some negative qualities about it?"
      multiline
      rows="7"
      rowsMax="10"
      value=""
      onChange={() => null}
      margin="normal"
      fullWidth
    />
    <TextField
      id="standard-multiline-flexible"
      label="What painpoint is this product solving?"
      multiline
      rows="7"
      rowsMax="10"
      value=""
      onChange={() => null}
      margin="normal"
      fullWidth
    />
    <TextField
      id="standard-multiline-flexible"
      label="What's the sales offer here?"
      multiline
      rows="4"
      rowsMax="10"
      value=""
      onChange={() => null}
      margin="normal"
      fullWidth
    />
  </>
);

export default BrainStorm;
