import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import history from '../../utility/history';
import ExploreProjects from '../ExploreProjects/ExploreProjects';
import UserProfile from '../UserProfile/UserProfile';
import ImageMapEditor from '../imagemap/ImageMapEditor';
import LogIn from '../LogIn/LogIn';
import SwipeFolder from '../SwipeFolder/SwipeFolder';
import SelectedSwipeFolder from '../SelectedSwipeFolder/SelectedSwipeFolder';
import { withContext } from '../../utility/context';

const PrivateRoute = withContext(({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.context.isAuthenticated ? (
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
    <Route exact path="/login" component={LogIn} />
    <PrivateRoute exact path="/swipe-folder" component={SwipeFolder} />
    <PrivateRoute
      exact
      path="/swipe-folder/:id"
      component={SelectedSwipeFolder}
    />
    <PrivateRoute path="/workspace" component={ImageMapEditor} />
    <PrivateRoute exact path="/profile" component={UserProfile} />
  </Router>
);

export default Routes;
