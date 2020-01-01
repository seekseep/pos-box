import React from 'react'
import * as Icons from 'react-feather'
import { Link } from 'react-router-dom'

import { usePost, useUser } from '../contexts/users'

import PageHeader, { Action, Title } from './PageHeader'

export default function PostDetail ({ match }) {
  const { id, postID } = match.params

  const user = useUser(id)
  const post = usePost(id, postID)

  return (
    <div className="flex flex-col min-h-screen items-streach">
      <PageHeader>
        <Action to="/"><Icons.Home /></Action>
        <Title>記事</Title>
      </PageHeader>
      <div className="max-w-lg mx-auto p-4 w-full">
        <div className="mb-4">
          <div className="text-2xl font-bold mb-2">{post ? post.title : null}</div>
          <div className="text-right text-xs">
            作者: {user ? <Link className="p-2 inline-block text-gray-800" to={`/users/${user.id}`}>{user.displayName}</Link> : null}
          </div>
        </div>
        {post ? (
          post.body.split('\n').map((line, i) =>
            <div key={i} className="mb-2">{line}</div>
          )
        ) : (
          null
        )}
      </div>
    </div>
  )
}
