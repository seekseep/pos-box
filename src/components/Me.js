import React from 'react'
import * as Icons from 'react-feather'
import { Link } from 'react-router-dom'

import { useUser, usePosts } from '../contexts/me'

import PostsList from './PostsList'
import PageHeader, { Action, Title } from './PageHeader'

const User = ({ user }) => (
  <PageHeader>
    <Title>{user ? user.displayName : ''}</Title>
    <Action to="/settings"><Icons.Settings /></Action>
  </PageHeader>
)

export default function Me () {
  const user = useUser()
  const posts = usePosts()

  return (
    <div className="flex flex-col min-h-screen items-stretch">
      <User user={user} />
      <PostsList user={user} posts={posts} />
      <div className="fixed left-0 bottom-0 right-0">
        <div className="max-w-lg mx-auto flex justify-center">
          <Link to="/posts/new" className="mx-auto rounded-full p-3 bg-blue-500 mb-4 shadow-lg">
            <Icons.Plus color="white" />
          </Link>
        </div>
      </div>
    </div>
  )
}
