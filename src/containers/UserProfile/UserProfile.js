import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import _ from 'lodash';
import MainNav from '../../components/MainNav/MainNav';
import BrowseItem from '../../components/BrowseItem/BrowseItem';
import {
  HeaderContent,
  Header,
  EditProfileButton,
  ProfileAvatar,
  HireButton,
  ProjectsContainer,
  EditorAvatar,
  HiddenInput,
} from './styles';
import Typography from '../../components/Typography/Typography';
import projects from '../../utility/projects';
import { withContext } from '../../utility/context';

const capitalizeStr = string => {
  const splitString = string.split('');
  splitString.splice(0, 1, string[0].toUpperCase());
  return splitString.join('');
};

const renderField = errors => {
  const fields = ['name', 'username', 'email', 'location', 'bio'];

  return fields.map(fieldName => (
    <Grid item xs={12} key={fieldName}>
      <Field
        name={fieldName}
        render={({ field }) => (
          <TextField
            {...field}
            error={Boolean(errors[fieldName])}
            helperText={errors[fieldName]}
            fullWidth
            label={capitalizeStr(fieldName)}
            margin="normal"
            variant="outlined"
            disabled={fieldName === 'email'}
          />
        )}
      />
    </Grid>
  ));
};

const UserProfile = ({
  location: { pathname },
  match: {
    params: { username },
  },
  context: { user },
  contextHandler,
}) => {
  const [userState, setUserState] = useState({});
  const [profileEditorState, setProfileEditorState] = useState(false);
  const [profileEditorError, setProfileEditorError] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [editorImage, setEditorImage] = useState(null);
  const profileEditorOpen = () => setProfileEditorState(true);
  const profileEditorClose = () => {
    setProfileEditorState(false);
    setEditorImage(null);
  };
  const profileImageHandler = ({ currentTarget: { files } }) => {
    const image = files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    setProfileImage(formData);
    const imageURL = URL.createObjectURL(image);
    setEditorImage(imageURL);
  };

  const saveProfileHandler = async (data, { setSubmitting }) => {
    setSubmitting(true);
    const userCredentials = {
      bio: user.credentials.bio,
      email: user.credentials.email,
      location: user.credentials.location,
      name: user.credentials.name,
      username: user.credentials.username,
    };
    const newUser = {
      ...user,
      credentials: {
        ...user.credentials,
        ...data,
      },
    };

    if (profileImage) {
      const imageResponse = await axios.post('/user/image', profileImage);

      if (imageResponse.status >= 200 && imageResponse.status <= 299) {
        newUser.credentials.imageUrl = imageResponse.data.imageUrl;
        contextHandler({ user: newUser });
      } else {
        setProfileEditorError(imageResponse.data.error);
        setSubmitting(false);
        profileEditorOpen();
      }
    }

    const userResponse = await axios.post('/user', data);

    if (!_.isEqual(userCredentials, data)) {
      if (userResponse.status >= 200 && userResponse.status <= 299) {
        contextHandler({ user: newUser });
      } else {
        setSubmitting(false);
        profileEditorOpen();
        setProfileEditorError(userResponse.data.error);
      }
    }
  };

  useEffect(() => {
    if (user.credentials.username === username) {
      const userInfo = {
        user: user.credentials,
        projects: user.projects,
      };
      setUserState(userInfo);
    } else {
      axios.get(`/user/${username}`).then(({ data }) => setUserState(data));
    }
  }, [user, username]);

  return (
    <>
      <MainNav />
      <Header>
        {user.credentials.username === username && (
          <EditProfileButton variant="outlined" onClick={profileEditorOpen}>
            Edit Profile
          </EditProfileButton>
        )}
        <HeaderContent>
          <Typography variant="h4" color="contrast" align="center">
            {userState.user ? userState.user.name : 'Full name'}
          </Typography>
          <Typography color="#cfcdcc" align="center">
            @{userState.user ? userState.user.username : 'username'}
          </Typography>
          <ProfileAvatar
            src={
              userState.user
                ? userState.user.imageUrl
                : 'https://firebasestorage.googleapis.com/v0/b/adverwriting.appspot.com/o/no-img.jpg?alt=media&token=b74e840b-a0b7-45e4-9528-a23951901aee'
            }
            alt="Profile"
          />
          <Typography align="center">
            {userState.user ? userState.user.location : 'Location'}
          </Typography>
          <HireButton variant="contained" color="primary">
            Hire Me!
          </HireButton>
        </HeaderContent>
      </Header>
      <Container size="xs">
        <Typography color="light" align="center">
          {userState.user ? userState.user.bio : 'About Me'}
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

      <Dialog
        open={profileEditorState}
        onClose={profileEditorClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" align="center">
          Edit Profile
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: userState.user && userState.user.name,
              username: userState.user && userState.user.username,
              email: userState.user && userState.user.email,
              location: userState.user && userState.user.location,
              bio: userState.user && userState.user.bio,
            }}
            validate={() => true}
            onSubmit={saveProfileHandler}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <EditorAvatar
                      src={editorImage || userState.user.imageUrl}
                    />
                  </Grid>
                  <Grid item>
                    <HiddenInput
                      onChange={profileImageHandler}
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      type="file"
                    />
                    <label htmlFor="raised-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload Image
                      </Button>
                    </label>
                  </Grid>
                  <Grid item>
                    <Button variant="contained">Delete</Button>
                  </Grid>
                  {renderField(errors)}
                </Grid>
                {profileEditorError && (
                  <Typography variant="subtitle" color="red">
                    {profileEditorError}
                  </Typography>
                )}
                <Grid container justify="flex-end">
                  <DialogActions>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={profileEditorClose}
                      disable={isSubmitting ? 1 : 0}
                    >
                      Save Profile
                    </Button>
                  </DialogActions>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withContext(UserProfile);
