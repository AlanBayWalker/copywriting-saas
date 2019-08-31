import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const WorkspaceSideMenu = styled.div`
  border-left: gray solid 4px;
  height: 100vh;
  max-height: 100vh;
  position: relative;
`;

export const TabContainer = styled.div`
  padding: 0 2rem;
`;

export const OptionsBar = styled(Grid)`
  bottom: 0;
  padding: 1rem;
  position: absolute;
  width: 100%;
`;
