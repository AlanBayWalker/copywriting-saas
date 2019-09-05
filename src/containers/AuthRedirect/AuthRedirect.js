import React from 'react';
import { Redirect } from 'react-router-dom';
import { withContext } from '../../utility/context';

const AuthRedirect = ({ contextHandler }) => {
  contextHandler({ authDialog: 'login' });

  return <Redirect to="/" />;
};

export default withContext(AuthRedirect);
