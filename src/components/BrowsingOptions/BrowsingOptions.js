import React, { useState } from 'react';
import {
  Grid,
  MenuItem,
  Button,
  OutlinedInput,
  Menu,
  ButtonGroup,
} from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import FilterListIcon from '@material-ui/icons/FilterList';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import { Container, FormContainer, SelectInput } from './styles';

const BrowsingOptions = () => {
  const [selectState, setSelectState] = useState('popular');
  const selectStateHandler = ({ target: { value } }) => setSelectState(value);

  const [gridEl, setGridEl] = useState(null);
  const handleGridOpen = ({ currentTarget }) => setGridEl(currentTarget);
  const handleGridClose = () => setGridEl(null);

  return (
    <Container container justify="space-between" alignItems="center">
      <Grid item>
        <FormContainer variant="outlined">
          <SelectInput
            value={selectState}
            onChange={selectStateHandler}
            input={<OutlinedInput name="age" />}
          >
            <MenuItem value="popular">Popular</MenuItem>
            <MenuItem value="following">Following</MenuItem>
            <MenuItem value="recent">Recent</MenuItem>
            <MenuItem value="trending">Trending</MenuItem>
          </SelectInput>
        </FormContainer>
      </Grid>
      <Grid item>
        <Button color="primary" variant="outlined">
          <FilterListIcon style={{ marginRight: '10px' }} />
          Filter
        </Button>
        <Button
          color="primary"
          variant="outlined"
          style={{ marginLeft: '10px' }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleGridOpen}
        >
          <AppsIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={gridEl}
          keepMounted
          open={Boolean(gridEl)}
          onClose={handleGridClose}
        >
          <MenuItem selected style={{ backgroundColor: '#fff' }}>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button>
                <VideoLabelIcon color="primary" />
              </Button>
              <Button>
                <VideoLabelIcon color="primary" />
              </Button>
              <Button>
                <VideoLabelIcon color="primary" />
              </Button>
            </ButtonGroup>
          </MenuItem>
        </Menu>
      </Grid>
    </Container>
  );
};

export default BrowsingOptions;
