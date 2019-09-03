import styled from 'styled-components';
import {
  AppBar as MUAppBar,
  LinearProgress,
  Avatar,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Form } from 'formik';

export const AppBar = styled(MUAppBar)`
  background-color: #26262b;
`;

export const Logo = styled.img`
  width: 200px;
`;

export const Progress = styled(LinearProgress)`
  height: 15px;
`;

export const Header = styled.header`
  background-color: #f5f5f5;
  padding: 1rem 0;
`;

export const FormContainer = styled(Form)`
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 600px;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ProfileAvatar = styled(Avatar)`
  height: 80px;
  width: 80px;
`;

export const SurveyContainer = styled(FormControl)`
  margin: 2rem 0;
  width: 100%;
`;

export const ControlLabel = styled(FormControlLabel)`
  border: 1px solid #555;
  border-radius: 4px;
  margin: 0.5rem 0 0.5rem 5px;
`;

export const Bold = styled.span`
  font-weight: bold;
`;
