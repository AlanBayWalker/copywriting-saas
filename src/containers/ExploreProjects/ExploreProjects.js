import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import axios from 'axios';
import MainNav from '../../components/MainNav/MainNav';
import BrowsingOptions from '../../components/BrowsingOptions/BrowsingOptions';
import BrowseGrid from '../../components/BrowseGrid/BrowseGrid';
import Footer from '../../components/Footer/Footer';
import Typography from '../../components/Typography/Typography';
import { Header, HeaderImage } from './styles';
import { withContext } from '../../utility/context';
import exploreImage from '../../assets/explore-header.svg';

const fetch = async (setItems, templateId) => {
  const items = await axios.get(
    templateId ? `/projects/${templateId}` : '/templates'
  );
  console.log(items, templateId ? `/projects/${templateId}` : '/templates');
  if (items && items.status >= 200 && items.status <= 299) {
    setItems(items.data);
  }
};

const ExploreProjects = ({
  match: {
    params: { templateId },
  },
  context: { token },
  contextHandler,
}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(setItems, templateId);
  }, [templateId]);

  const signupHandler = () => contextHandler({ authDialog: 'signup' });

  return (
    <>
      <MainNav />
      {!token && (
        <Header container justify="center" spacing={1}>
          <Grid item md={4}>
            <Typography
              variant="h3"
              color="74b9ff"
              style={{ fontWeight: 'bold' }}
            >
              Discover the world's top copywriters & direct marketers
            </Typography>
            <Typography color="#888">
              Swipe Cloud is the leading destination to find & showcase direct
              marketing work and home to the world's best copywriters
            </Typography>
            <Button color="primary" variant="contained" onClick={signupHandler}>
              Sign Up
            </Button>
          </Grid>
          <Grid item>
            <HeaderImage src={exploreImage} />
          </Grid>
        </Header>
      )}
      <BrowsingOptions />
      <BrowseGrid items={items} />
      <Footer />
    </>
  );
};

export default withContext(ExploreProjects);
