import React from 'react';
import { Container, Grid } from '@material-ui/core';
import MainNav from '../MainNav/MainNav';
import BrowseItem from '../BrowseItem/BrowseItem';
import {
  HeaderContent,
  Header,
  EditProfileButton,
  ProfileAvatar,
  HireButton,
  ProjectsContainer,
} from './styles';
import Typography from '../Typography/Typography';
import ProfileAvatarImage from '../../assets/profile-avatar.jpg';

const projectsRender = path => {
  const res = [];
  for (let i = 0; i < 6; i++) {
    res.push(
      <Grid item md={4}>
        <BrowseItem path={path} />
      </Grid>
    );
  }
  return res;
};

const UserProfile = ({ location: { pathname } }) => (
  <>
    <MainNav />
    <Header>
      <EditProfileButton variant="outlined">Edit Profile</EditProfileButton>
      <HeaderContent>
        <Typography variant="h4" color="contrast" align="center">
          Full Name
        </Typography>
        <Typography color="#cfcdcc" align="center">
          @nickname
        </Typography>
        <ProfileAvatar src={ProfileAvatarImage} alt="Profile" />
        <Typography align="center">New Orleans, Louisiana</Typography>
        <HireButton variant="contained" color="primary">
          Hire Me!
        </HireButton>
      </HeaderContent>
    </Header>
    <Container size="xs">
      <Typography color="light" align="center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse.
      </Typography>
      <ProjectsContainer container spacing={5}>
        {projectsRender(pathname)}
      </ProjectsContainer>
    </Container>
  </>
);

export default UserProfile;
