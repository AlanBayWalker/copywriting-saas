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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  {
    icon: <FormatShapesIcon />,
    header: 'Practice your skills',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  },
  {
    icon: <FilterDramaIcon />,
    header: 'Share your work',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
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
