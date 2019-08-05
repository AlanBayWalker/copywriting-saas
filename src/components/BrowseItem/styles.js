import styled from 'styled-components';
import { Card, CardMedia, CardActions } from '@material-ui/core';

export const CardImage = styled(CardMedia)`
  height: 250px;
`;

export const CardInfoBar = styled(CardActions)`
  background-color: #fff;
  bottom: -50px;
  left: 0;
  position: absolute;
  transition: bottom 0.2s;
  width: 100%;
`;

export const CardContainer = styled(Card)`
  border-radius: 0;
  margin: 0 auto;
  max-width: 350px;
  padding: 10px;
  position: relative;
  :hover {
    ${CardInfoBar} {
      bottom: 0;
    }
  }
`;
