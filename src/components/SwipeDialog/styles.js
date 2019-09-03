import styled from 'styled-components';
import { TableRow as MUTableRow } from '@material-ui/core';
import Folder from '@material-ui/icons/Folder';

export const TableRow = styled(MUTableRow)`
  cursor: pointer;
`;

export const LoaderContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const FolderIcon = styled(Folder)`
  margin: 0 1rem -0.5rem 0;
`;
