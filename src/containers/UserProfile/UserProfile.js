import React from 'react';
import { Container, Grid } from '@material-ui/core';
import MainNav from '../../components/MainNav/MainNav';
import BrowseItem from '../../components/BrowseItem/BrowseItem';
import {
  HeaderContent,
  Header,
  EditProfileButton,
  ProfileAvatar,
  HireButton,
  ProjectsContainer,
} from './styles';
import Typography from '../../components/Typography/Typography';
import projects from '../../utility/projects';
import { withContext } from '../../utility/context';

const UserProfile = ({ location: { pathname }, context: { user } }) => (
  <>
    <MainNav />
    <Header>
      <EditProfileButton variant="outlined">Edit Profile</EditProfileButton>
      <HeaderContent>
        <Typography variant="h4" color="contrast" align="center">
          {user.credentials.name}
        </Typography>
        <Typography color="#cfcdcc" align="center">
          @{user.credentials.username}
        </Typography>
        <ProfileAvatar src={user.credentials.imageUrl} alt="Profile" />
        <Typography align="center">{user.credentials.location}</Typography>
        <HireButton variant="contained" color="primary">
          Hire Me!
        </HireButton>
      </HeaderContent>
    </Header>
    <Container size="xs">
      <Typography color="light" align="center">
        {user.credentials.bio}
      </Typography>
      <ProjectsContainer justify="center" container spacing={3}>
        {projects.map(
          (config, index) =>
            index < 6 && (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <BrowseItem path={pathname} {...config} />
              </Grid>
            )
        )}
      </ProjectsContainer>
    </Container>
  </>
);

export default withContext(UserProfile);
