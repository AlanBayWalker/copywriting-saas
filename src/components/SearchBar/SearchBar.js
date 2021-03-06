import React from 'react';
import { Grid, InputBase } from '@material-ui/core';
import { Container, SearchIcon } from './styles';

const SearchBar = () => (
  <Container container>
    <Grid item xs={2}>
      <SearchIcon style={{ color: '#fff' }} />
    </Grid>
    <Grid item xs={10}>
      <InputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        style={{ color: '#fff' }}
      />
    </Grid>
  </Container>
);

export default SearchBar;
