import React, { useState } from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '../Typography/Typography';
import Link from '../Link/Link';
import NavLink from '../NavLink/NavLink';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../../assets/logo.png';

const AuthButtons = () => (
  <>
    <Grid item>
      <Link to="/login">
        <Button color="secondary" variant="contained">
          Log In
        </Button>
      </Link>
    </Grid>
    <Grid item>
      <Button color="secondary" variant="outlined">
        Sign Up
      </Button>
    </Grid>
  </>
);

const UserMenu = () => {
  const [menuState, setMenuState] = useState(null);
  const menuOpenHandler = ({ currentTarget }) => setMenuState(currentTarget);
  const menuCloseHandler = () => setMenuState(null);

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={menuOpenHandler}
      >
        <AccountCircleIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={menuState}
        keepMounted
        open={Boolean(menuState)}
        onClose={menuCloseHandler}
      >
        <Link to="/profile">
          <MenuItem onClick={menuCloseHandler}>Profile</MenuItem>
        </Link>

        <Link to="/my-account">
          <MenuItem onClick={menuCloseHandler}>My account</MenuItem>
        </Link>

        <Link to="/swipe-file">
          <MenuItem onClick={menuCloseHandler}>Swipe FIle</MenuItem>
        </Link>

        <Link to="/login">
          <MenuItem onClick={menuCloseHandler}>Logout</MenuItem>
        </Link>
      </Menu>
    </>
  );
};

const MainNav = () => (
  <AppBar color="white" position="static">
    <Toolbar>
      <Grid container justify="space-between">
        <Grid item sm={9}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <img src={Logo} alt="Swipe Camp" />
            </Grid>
            <Grid item>
              <NavLink to="/explore">
                <Typography color="light" gutter="0 .4rem">
                  EXPLORE
                </Typography>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/workspace">
                <Typography color="light" gutter="0 .4rem">
                  WORKSPACE
                </Typography>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={3}>
          <Grid
            container
            justify="space-between"
            style={{ marginTop: '.5rem' }}
          >
            <Grid item>
              <SearchBar />
            </Grid>
            {true ? <UserMenu /> : <AuthButtons />}
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default MainNav;
