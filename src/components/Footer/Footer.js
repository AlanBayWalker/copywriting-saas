import React from 'react';
import { Grid, Button } from '@material-ui/core';
import {
  Container,
  Header,
  ItemCard,
  CardHeader,
  CardBody,
  Divider,
  CreateIcon,
  FormatShapesIcon,
  FilterDramaIcon,
} from './styles';
import { withContext } from '../../utility/context';
import Typography from '../Typography/Typography';

const cards = [
  {
    icon: <CreateIcon />,
    header: 'Learn to write copy',
    content:
      'Do you feel lost when It comes to embarking on your copywriting journey? Swipe Cloud makes it easy to get ahead of the curve. You no longer have to sort through industry noise just to find out the information you need is behind a $1000 paywall.',
  },
  {
    icon: <FormatShapesIcon />,
    header: 'Practice your skills',
    content:
      'Gain confidence in your ability to provide quality work for clients. Stop browsing the web for practice projects you can use to develop your skills. Swipe Cloud has custom made mock companies you can copywrite for. ',
  },
  {
    icon: <FilterDramaIcon />,
    header: 'Share your work',
    content:
      'With Swipe Cloud you can share and browse the work of many talented copywriters. Embark on a journey to build the ultimate swipe file and find inspiration in the specific niche you currently write for. ',
  },
];

const Footer = ({ contextHandler }) => {
  const toggleContactForm = () => contextHandler({ contactDialog: true });

  return (
    <Container>
      <Header color="#fff" variant="h4" align="center">
        Want to know more about Swipe Cloud?
      </Header>

      <Grid container justify="space-around">
        {cards.map(({ icon, header, content }) => (
          <Grid item xs={12} md={3} key={header}>
            <ItemCard>
              {icon}
              <CardHeader variant="h6">{header}</CardHeader>
              <CardBody>{content}</CardBody>
            </ItemCard>
          </Grid>
        ))}
      </Grid>

      <Divider variant="middle" light />

      <Grid container justify="space-between">
        <Typography color="#fff">
          © 2019 Swipe Cloud. All rights reserved.
        </Typography>
        <Button color="primary" onClick={toggleContactForm}>
          Want to ask a question or report a bug?
        </Button>
      </Grid>
    </Container>
  );
};

export default withContext(Footer);
