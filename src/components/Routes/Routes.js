import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import history from '../../utility/history';
import SignUp from '../../containers/SignUp/SignUp';
import ExploreProjects from '../../containers/ExploreProjects/ExploreProjects';
import UserProfile from '../../containers/UserProfile/UserProfile';
import ImageMapEditor from '../../containers/ProjectEditor/ProjectEditor';
import LogIn from '../../containers/LogIn/LogIn';
import SwipeFolder from '../SwipeFolder/SwipeFolder';
import SelectedSwipeFolder from '../SelectedSwipeFolder/SelectedSwipeFolder';
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
            pathname: '/login',
            state: { from: props.location },
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
    <Route exact path="/login" component={LogIn} />
    <Route exact path="/signup" component={SignUp} />
    <PrivateRoute exact path="/swipe-folder" component={SwipeFolder} />
    <PrivateRoute
      exact
      path="/swipe-folder/:id"
      component={SelectedSwipeFolder}
    />
    <PrivateRoute path="/workspace/:id" component={ImageMapEditor} />
    <PrivateRoute exact path="/profile/:username" component={UserProfile} />
  </Router>
);

export default Routes;
