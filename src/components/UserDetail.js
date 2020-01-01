import React from 'react'
import * as Icons from 'react-feather'

import { useUser } from '../contexts/users'

import { Body } from './PostsList'

import PageHeader, { Action, Title } from './PageHeader'

export default function UserDetail ({ match }) {
  const { id } = match.params
  const user = useUser(id)
  const posts = user && user.posts ? Object.values(user.posts) : null

  return (
    <div className="flex flex-col min-h-screen items-streach">
      <PageHeader>
        <Action to="/"><Icons.Home /></Action>
        <Title>ユーザー</Title>
      </PageHeader>
      <div className="max-w-lg mx-auto w-full">
        <div className="py-8 text-xl font-bold text-center px-4">
          {user ? user.displayName : null}
        </div>
        {posts && posts.length > 0 ? (
          <Body user={user} posts={posts} />
        ) : null}
      </div>
    </div>
  )
}
