import React, { useState } from 'react';
import { Grid, CardActionArea, Button } from '@material-ui/core';
import { CardContainer, CardImage, CardInfoBar } from './styles';
import Typography from '../Typography/Typography';
import BrowseItemModal from '../BrowseItemModal/BrowseItemModal';
import Thumbnail from '../../assets/item-thumbnail.png';

const BrowseItem = ({
  path,
  title,
  thumbnail,
  author,
  description,
  categories,
  link,
}) => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const dialogCloseHandler = () => setDialogStatus(false);
  const dialogOpenHandler = () => setDialogStatus(true);

  const pathHandler = (originalProject, cloneProject) =>
    path.split('/')[2] === 'browse' ? cloneProject : originalProject;

  return (
    <>
      <CardContainer onClick={dialogOpenHandler}>
        <CardActionArea>
          <CardImage image={thumbnail} title={title} />
        </CardActionArea>
        <CardInfoBar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography color="bold" gutter="0 0" variant="">
                {title}
              </Typography>
              <Typography texColor="light" gutter="0 0" variant="caption">
                {pathHandler('Created', 'Cloned')} By: {author}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                style={{ marginRight: '10px' }}
              >
                Save
              </Button>
              <Button variant="outlined" size="small" color="primary">
                Like
              </Button>
            </Grid>
          </Grid>
        </CardInfoBar>
      </CardContainer>
      <BrowseItemModal
        dialogStatus={dialogStatus}
        dialogCloseHandler={dialogCloseHandler}
        path={path}
        title={title}
        thumbnail={thumbnail}
        author={author}
        description={description}
        link={link}
        categories={categories}
      />
    </>
  );
};

export default BrowseItem;
