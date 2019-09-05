import React, { useState } from 'react';
import { Grid, CardActionArea, Button } from '@material-ui/core';
import axios from 'axios';
import { CardContainer, CardImage, CardInfoBar } from './styles';
import Typography from '../Typography/Typography';
import BrowseItemModal from '../BrowseItemModal/BrowseItemModal';
import SwipeDialog from '../SwipeDialog/SwipeDialog';

const BrowseItem = item => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [swipeDialog, setSwipeDialog] = useState(false);
  const [swipeStatus, setSwipeStatus] = useState(null);
  const [likeStatus, setLikeStatus] = useState(null);

  const dialogCloseHandler = () => setDialogStatus(false);
  const dialogOpenHandler = () => setDialogStatus(true);
  const swipeDialogCloseHandler = () => setSwipeDialog(false);
  const swipeDialogOpenHandler = () => setSwipeDialog(true);

  const handleLocalSwipe = (swipeOn, swipeOff) => {
    if (swipeStatus === null) {
      return item.swiped ? swipeOn : swipeOff;
    }
    return swipeStatus ? swipeOn : swipeOff;
  };

  const unswipeHandler = async () => {
    const res = await axios.post('/unswipe-project', {
      projectId: item.projectId,
    });
    if (res.status >= 200 && res.status <= 299) {
      item.unswipeHandler && item.unswipeHandler(item.projectId);
      setSwipeStatus(false);
    }
  };

  const handleLocalLike = (likeOn, likeOff) => {
    if (likeStatus === null) {
      return item.liked ? likeOn : likeOff;
    }
    return likeStatus ? likeOn : likeOff;
  };

  const likeHandler = async () => {
    const res = await axios.get(`/project/${item.projectId}/like`);
    if (res.status >= 200 && res.status <= 299) {
      // item.unswipeHandler && item.unswipeHandler(item.projectId);
      setLikeStatus(true);
    }
  };

  const unlikeHandler = async () => {
    const res = await axios.get(`/project/${item.projectId}/unlike`);
    if (res.status >= 200 && res.status <= 299) {
      // item.unswipeHandler && item.unswipeHandler(item.projectId);
      setLikeStatus(false);
    }
  };

  return (
    <>
      <CardContainer>
        <CardActionArea onClick={dialogOpenHandler}>
          <CardImage image={item.thumbnail} title={item.title} />
        </CardActionArea>
        <CardInfoBar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography color="bold" gutter="0 0">
                {item.title}
              </Typography>
              {item.author && (
                <Typography gutter="0 0" variant="caption">
                  Completed By: {item.author}
                </Typography>
              )}
            </Grid>
            {item.projectId && (
              <Grid item>
                <Button
                  variant={handleLocalSwipe('contained', 'outlined')}
                  size="small"
                  color="primary"
                  style={{ marginRight: '10px' }}
                  onClick={handleLocalSwipe(
                    unswipeHandler,
                    swipeDialogOpenHandler
                  )}
                >
                  Save{handleLocalSwipe('d', '')}
                </Button>
                <Button
                  variant={handleLocalLike('contained', 'outlined')}
                  size="small"
                  color="primary"
                  onClick={handleLocalLike(unlikeHandler, likeHandler)}
                >
                  Like{handleLocalLike('d', '')}
                </Button>
              </Grid>
            )}
          </Grid>
        </CardInfoBar>
      </CardContainer>
      <BrowseItemModal
        dialogStatus={dialogStatus}
        dialogCloseHandler={dialogCloseHandler}
        handleLocalSwipe={handleLocalSwipe}
        onSwipe={handleLocalSwipe(unswipeHandler, swipeDialogOpenHandler)}
        {...item}
      />
      <SwipeDialog
        status={swipeDialog}
        openHandler={swipeDialogOpenHandler}
        closeHandler={swipeDialogCloseHandler}
        setSwipeStatus={setSwipeStatus}
        projectId={item.projectId}
      />
    </>
  );
};

export default BrowseItem;
