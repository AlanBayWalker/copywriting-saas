import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';
import ProfileBackground from '../../assets/profile-background.png';

export const Header = styled.header`
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url(${ProfileBackground}) center center no-repeat;
  background-size: cover;
  height: 300px;
  margin-bottom: 150px;
  position: relative;
`;

export const HeaderContent = styled.div`
  margin: 0;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const EditProfileButton = styled(Button)`
  position: absolute;
  right: 2rem;
  top: 2rem;
`;

export const ProfileAvatar = styled.img`
  display: block;
  height: 150px;
  margin: 0 auto;
  width: 150px;
`;

export const HireButton = styled(Button)`
  display: block;
  margin: 0 auto;
  width: 100px;
`;

export const ProjectsContainer = styled(Grid)`
  margin: 2rem 0;
`;
