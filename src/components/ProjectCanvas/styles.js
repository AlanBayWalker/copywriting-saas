import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const Container = styled.div`
  background-color: gray;
  position: relative;
  width: 100%;
`;

export const EmptyProject = styled(Paper)`
  height: 50%;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`;
