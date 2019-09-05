import styled, { css } from 'styled-components';
import { Divider as MUDivider } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import FormatShapes from '@material-ui/icons/FormatShapes';
import FilterDrama from '@material-ui/icons/FilterDrama';
import Typography from '../Typography/Typography';

export const Container = styled.div`
  background-color: #222;
  padding: 2rem;
  max-width: 100vw;
`;

export const Header = styled(Typography)`
  font-weight: bold;
  padding: 2rem 0 4rem;
  position: relative;
  :after {
    background-color: #74b9ff;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    height: 3px;
    width: 80px;
    position: absolute;
  }
`;

let iconStyles = css`
  fill: #fff;
`;

export const ItemCard = styled.div`
  :hover {
    background-color: #292929;
    transition: background-color 0.5s;
    ${() => {
      iconStyles = css`
        fill: red;
      `;
    }}
  }
  transition: background-color 0.5s;
  padding: 2rem;
`;

export const CardHeader = styled(Typography)`
  color: #fff;
  font-weight: bold;
`;

export const CardBody = styled(Typography)`
  color: #ccc;
`;

export const Divider = styled(MUDivider)`
  background-color: #555;
  margin: 2rem 0;
`;

export const CreateIcon = styled(Create)`
  ${iconStyles}
`;

export const FormatShapesIcon = styled(FormatShapes)`
  ${iconStyles}
`;

export const FilterDramaIcon = styled(FilterDrama)`
  ${iconStyles}
`;
