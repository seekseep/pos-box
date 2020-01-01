
import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import { useIsReady, useUser } from '../contexts/auth'

import MeProvider from '../providers/Me'
import UsersProvider from '../providers/Users'

import Welcome from './Welcome'
import SignUp from './SignUp'
import SignIn from './SignIn'
import SignOut from './SignOut'
import ResetPassword from './ResetPassword'
import Me from './Me'
import CreatePost from './CreatePost'
import User from './User'
import Settings from './Settings'

import NotFound from './NotFound'

const Contents = () => {
  const isReady = useIsReady()
  const user = useUser()

  const isAuthorized = !!(user)

  return isReady ? (
    isAuthorized ? (
      <MeProvider>
        <UsersProvider>
          <Router>
            <Switch>
              <Route path="/" exact component={Me} />
              <Route path="/posts/new" component={CreatePost} />
              <Route path="/signout" component={SignOut} />
              <Route path="/settings" component={Settings} />
              <Route path="/users/:id" component={User} />
              <Route path="/404" component={NotFound} />
              <Redirect to="/"/>
            </Switch>
          </Router>
        </UsersProvider>
      </MeProvider>
    ) : (
      <UsersProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/forgot" component={ResetPassword} />
            <Route path="/users/:id" component={User} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </UsersProvider>
    )
  ) : null
}

export default Contents
