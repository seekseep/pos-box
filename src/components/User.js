import React from 'react'
import { Switch, Route } from 'react-router-dom'

import UserDetail from './UserDetail'
import PostDetail from './PostDetail'

export default function User () {
  return (
    <Switch>
      <Route path="/users/:id" exact component={UserDetail} />
      <Route path="/users/:id/posts/:postID" exact component={PostDetail} />
    </Switch>
  )
}
