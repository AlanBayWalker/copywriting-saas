import styled from 'styled-components';
import { AppBar, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

export const Container = styled(AppBar)`
  background-color: #26262b;
`;

export const MenuButton = styled(Button)`
  position: relative;
  ::after {
    content: ' ';
    border: 5px solid transparent;
    border-top-color: #fff;
    height: 0;
    position: absolute;
    right: 4px;
    top: 15px;
    width: 0;
    z-index: 1;
  }
`;

export const AccountCircleIcon = styled(AccountCircle)`
  fill: #fff;
`;
