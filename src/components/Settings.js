import React from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import * as Icons from 'react-feather'

import PageHeader, { Action, Title } from './PageHeader'
import UpdateProfile from './UpdateProfile'

const Item = ({ to, children }) => (
  <Link to={to} className="px-4 p-3 border-b block">
    {children}
  </Link>
)

const Home = () => (
  <>
    <PageHeader>
      <Action to="/"><Icons.X /></Action>
      <Title>設定</Title>
    </PageHeader>
    <div className="max-w-lg mx-auto py-4">
      <Item to="/settings/profile">プロフィールの変更</Item>
      <Item to="/signout">ログアウト</Item>
    </div>
  </>
)

export default function Settings () {
  return (
    <Switch>
      <Route path="/settings" exact component={Home} />
      <Route path="/settings/profile" exact component={UpdateProfile} />
      <Redirect to="/settings" />
    </Switch>
  )
}
