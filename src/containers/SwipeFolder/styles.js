import styled from 'styled-components';
import { TableCell, Container as MUContainer, Button } from '@material-ui/core';
import Folder from '@material-ui/icons/Folder';
import MoreVert from '@material-ui/icons/MoreVert';

export const Container = styled(MUContainer)`
  padding-top: 4rem;
`;

export const LinkCell = styled(TableCell)`
  cursor: pointer;
`;

export const FolderIcon = styled(Folder)`
  margin: 0 1rem -0.5rem 0;
`;

export const MoreVertIcon = styled(MoreVert)`
  fill: #555;
`;

export const LoaderContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const DeleteButton = styled(Button)`
  background-color: red;
  color: #fff;
  :hover {
    background-color: rgba(255, 0, 0, 0.6);
    color: #fff;
  }
`;
