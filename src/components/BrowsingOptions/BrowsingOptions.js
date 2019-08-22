import React, { useState } from 'react';
import {
  Grid,
  MenuItem,
  Button,
  OutlinedInput,
  Menu,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import FilterListIcon from '@material-ui/icons/FilterList';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import Link from '../Link/Link';

import Typography from '../Typography/Typography';
import { Container, FormContainer, SelectInput } from './styles';

const renderCategoryItems = () => {
  const items = ['All', 'Landing Pages', 'Headlines', 'Slogans', 'CTAs'];
  return items.map(item => (
    <Grid item key={item}>
      <Link to="/">
        <Typography>{item}</Typography>
      </Link>
    </Grid>
  ));
};

const BrowsingOptions = () => {
  const [selectState, setSelectState] = useState('popular');
  const selectStateHandler = ({ target: { value } }) => setSelectState(value);

  const [gridEl, setGridEl] = useState(null);
  const handleGridOpen = ({ currentTarget }) => setGridEl(currentTarget);
  const handleGridClose = () => setGridEl(null);

  const [filterDialogState, setFilterDialogState] = useState(null);
  const filterDialogOpen = ({ currentTarget }) =>
    setFilterDialogState(currentTarget);
  const filterDialogClose = () => setFilterDialogState(null);

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
        <Grid container spacing={5}>
          {renderCategoryItems()}
        </Grid>
      </Grid>

      <Grid item>
        <Button color="primary" variant="outlined" onClick={filterDialogOpen}>
          <FilterListIcon style={{ marginRight: '10px' }} />
          Filter
        </Button>

        <Dialog
          onClose={filterDialogClose}
          aria-labelledby="simple-dialog-title"
          open={Boolean(filterDialogState)}
        >
          <DialogTitle id="simple-dialog-title" align="center">
            Filter Items
          </DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">Copy Types</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked onChange={() => null} value="gilad" />
                  }
                  label="Headers"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={jason}
                      onChange={() => null}
                      value="jason"
                    />
                  }
                  label="CTAs"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={antoine}
                      onChange={() => null}
                      value="antoine"
                    />
                  }
                  label="Newsletter"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={antoine}
                      onChange={() => null}
                      value="antoine"
                    />
                  }
                  label="FAQ"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={antoine}
                      onChange={() => null}
                      value="antoine"
                    />
                  }
                  label="Slogans"
                />
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Project Types</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked onChange={() => null} value="gilad" />
                  }
                  label="Full Projects"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={jason}
                      onChange={() => null}
                      value="jason"
                    />
                  }
                  label="Email Subscriptions"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={antoine}
                      onChange={() => null}
                      value="antoine"
                    />
                  }
                  label="About Pages"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={antoine}
                      onChange={() => null}
                      value="antoine"
                    />
                  }
                  label="Social Media"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={antoine}
                      onChange={() => null}
                      value="antoine"
                    />
                  }
                  label="Testimonials"
                />
              </FormGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={filterDialogClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

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
