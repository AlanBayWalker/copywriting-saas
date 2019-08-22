import React, { useState } from 'react';
import { Grid, Toolbar, Button, Menu, MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Container } from './styles';
import Typography from '../Typography/Typography';
import Link from '../Link/Link';
import NavLink from '../NavLink/NavLink';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../../assets/logo.png';
import { withContext } from '../../utility/context';

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

const UserMenu = ({ contextHandler }) => {
  const [menuState, setMenuState] = useState(null);
  const menuOpenHandler = ({ currentTarget }) => setMenuState(currentTarget);
  const menuCloseHandler = () => setMenuState(null);
  const logOutHandler = () => {
    contextHandler({ isAuthenticated: false });
    menuCloseHandler();
  };

  return (
    <>
      <Grid item>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={menuOpenHandler}
        >
          <AccountCircleIcon style={{ fill: '#fff' }} />
        </Button>
      </Grid>
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

        <Link to="/swipe-folder">
          <MenuItem onClick={menuCloseHandler}>Swipe Folder</MenuItem>
        </Link>

        <Link to="/">
          <MenuItem onClick={logOutHandler}>Logout</MenuItem>
        </Link>
      </Menu>
    </>
  );
};

const MainNav = ({ context: { isAuthenticated }, contextHandler }) => (
  <Container position="static">
    <Toolbar>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Link to="/">
                <img
                  src={Logo}
                  alt="Swipe Camp"
                  style={{ height: 'auto', maxWidth: '200px' }}
                />
              </Link>
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
        <Grid item>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <SearchBar />
            </Grid>
            {isAuthenticated ? (
              <UserMenu contextHandler={contextHandler} />
            ) : (
              <AuthButtons />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </Container>
);

export default withContext(MainNav);
