import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import history from '../../utility/history';
import SignUp from '../../containers/SignUp/SignUp';
import ExploreProjects from '../../containers/ExploreProjects/ExploreProjects';
import UserProfile from '../../containers/UserProfile/UserProfile';
import ImageMapEditor from '../../containers/ProjectEditor/ProjectEditor';
import LogIn from '../../containers/LogIn/LogIn';
import SwipeFolder from '../../containers/SwipeFolder/SwipeFolder';
import SelectedSwipeFolder from '../../containers/SelectedSwipeFolder/SelectedSwipeFolder';
import UserDetails from '../../containers/UserDetails/UserDetails';
import AuthRedirect from '../../containers/AuthRedirect/AuthRedirect';
import ContactForm from '../ContactForm/ContactForm';
import { withContext } from '../../utility/context';

const PrivateRoute = withContext(({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.context.token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth-redirect',
            state: { from: props.location.pathname },
          }}
        />
      )
    }
  />
));

const Routes = () => (
  <Router history={history}>
    <Route exact path="/" component={ExploreProjects} />
    <Route exact path="/explore/:templateId" component={ExploreProjects} />
    <Route exact path="/profile/:username" component={UserProfile} />
    <Route exact path="/auth-redirect" component={AuthRedirect} />

    <PrivateRoute exact path="/user-details" component={UserDetails} />
    <PrivateRoute exact path="/swipe-folder" component={SwipeFolder} />
    <PrivateRoute
      exact
      path="/swipe-folder/:folderId"
      component={SelectedSwipeFolder}
    />
    <PrivateRoute path="/workspace/:id" component={ImageMapEditor} />

    <LogIn />
    <SignUp />
    <ContactForm />
  </Router>
);

export default Routes;
