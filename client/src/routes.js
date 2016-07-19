import React from 'react';
import { Route, IndexRoute } from 'react-router';
import RequireAuth from './components/auth/require_auth';

import App from './components/app';
import Welcome from './components/welcome';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import Feature_Private_1 from './components/feature_private_1';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Welcome }/>
    <Route path='/signin' component={ SignIn } />
    <Route path='/signout' component={ SignOut } />
    <Route path='/signup' component={ SignUp } />
    <Route path='/feature_private_1' component={ RequireAuth(Feature_Private_1) } />
  </Route>
)
