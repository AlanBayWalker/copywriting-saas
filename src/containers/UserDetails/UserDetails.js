import React, { useState } from 'react';
import {
  Toolbar,
  Grid,
  Button,
  TextField,
  FormLabel,
  FormGroup,
  FormHelperText,
  Checkbox,
} from '@material-ui/core';
import { Formik, Field } from 'formik';
import axios from 'axios';
import {
  AppBar,
  Logo,
  Progress,
  Header,
  FormContainer,
  HiddenInput,
  ProfileAvatar,
  Bold,
  SurveyContainer,
  ControlLabel,
} from './styles';
import Typography from '../../components/Typography/Typography';
import logo from '../../assets/logo.png';
import { withContext } from '../../utility/context';

const UserDetails = ({ context, contextHandler }) => {
  const [editorImage, setEditorImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  const saveProfileHandler = async (data, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    const user = {
      bio: data.bio,
      location: data.location,
    };

    if (editorImage) {
      const imageResponse = await axios.post('/user/image', imageBlob);
      console.log(imageResponse);

      if (imageResponse.status >= 200 && imageResponse.status <= 299) {
        console.log(imageResponse.data.imageUrl);
        user.imageUrl = imageResponse.data.imageUrl;
      } else {
        setErrors(imageResponse.data.error);
        setSubmitting(false);
      }
    }

    const userResponse = await axios.post('/user', data);

    if (userResponse.status >= 200 && userResponse.status <= 299) {
      contextHandler({ user });
    } else {
      setSubmitting(false);
      setErrors(userResponse.data.error);
    }
  };

  const profileImageHandler = ({ currentTarget: { files } }) => {
    const image = files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    setImageBlob(formData);
    const imageURL = URL.createObjectURL(image);
    setEditorImage(imageURL);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Logo src={logo} alt="logo" />
        </Toolbar>
      </AppBar>
      <Progress variant="determinate" value={50} />
      <Header>
        <Typography color="bold" variant="h4" align="center">
          Create your profile
        </Typography>
        <Typography align="center">
          Your avatar, bio, and location will appear on your public profile.
        </Typography>
      </Header>
      <Formik
        initialValues={null}
        validate={null}
        onSubmit={saveProfileHandler}
      >
        {({ isSubmitting, errors }) => (
          <FormContainer>
            <Grid container justify="center" alignItems="center" spacing={1}>
              <Grid item>
                <ProfileAvatar
                  src={
                    editorImage ||
                    'https://firebasestorage.googleapis.com/v0/b/adverwriting.appspot.com/o/no-img.jpg?alt=media'
                  }
                />
              </Grid>
              <Grid item>
                <HiddenInput
                  onChange={profileImageHandler}
                  accept="image/*"
                  id="raised-button-file"
                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload Image
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Grid item>
              <Field
                name="bio"
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors.bio)}
                    helperText={errors.bio}
                    fullWidth
                    label="Bio"
                    margin="normal"
                    variant="outlined"
                    rows={5}
                    multiline
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Field
                name="location"
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors.location)}
                    helperText={errors.location}
                    fullWidth
                    label="Location"
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <SurveyContainer component="fieldset">
              <FormLabel component="legend">
                <Typography color="bold">
                  <Bold>What brings you to Swipe Cloud?</Bold>
                </Typography>
              </FormLabel>
              <FormGroup>
                <ControlLabel
                  control={
                    <Field
                      name="learn"
                      render={({ field }) => <Checkbox {...field} />}
                    />
                  }
                  label={
                    <Typography gutter="0">
                      I'm here
                      <Bold> to learn how to write copy</Bold>
                    </Typography>
                  }
                />
                <ControlLabel
                  control={
                    <Field
                      name="practice"
                      render={({ field }) => <Checkbox {...field} />}
                    />
                  }
                  label={
                    <Typography gutter="0">
                      I'm here
                      <Bold> to practice writing copy</Bold>
                    </Typography>
                  }
                />
                <ControlLabel
                  control={
                    <Field
                      name="inspiration"
                      render={({ field }) => <Checkbox {...field} />}
                    />
                  }
                  label={
                    <Typography gutter="0">
                      I'm here
                      <Bold> for inspiration</Bold>
                    </Typography>
                  }
                />
                <ControlLabel
                  control={
                    <Field
                      name="hired"
                      render={({ field }) => <Checkbox {...field} />}
                    />
                  }
                  label={
                    <Typography gutter="0">
                      I'm here
                      <Bold> to get hired</Bold>
                    </Typography>
                  }
                />
              </FormGroup>
              <FormHelperText>Please check all that apply</FormHelperText>
            </SurveyContainer>

            {false && (
              <Typography variant="subtitle" color="red">
                "error"
              </Typography>
            )}
            <Grid container justify="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => null}
                disable={isSubmitting ? 1 : 0}
              >
                Finish
              </Button>
            </Grid>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};

export default withContext(UserDetails);
