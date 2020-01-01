import React from 'react'
import { Link } from 'react-router-dom'
import { LinkButton } from './Button'

export const Loading = () => (
  <div className="flex-grow flex flex-col justify-center">
    <div className="py-8 text-center text-gray-300 text-lg">読込中</div>
  </div>
)

export const Placeholder = () => (
  <div className="flex-grow flex flex-col justify-center items-center">
    <div className="mb-3 text-lg mb-4">新しく記事を投稿しよう</div>
    <div className="w-32">
      <LinkButton to="/posts/new">記事を作成する</LinkButton>
    </div>
  </div>
)

export const Body = ({ user, posts }) => (
  <div className="mx-auto max-w-lg w-full">
    {posts.map(post =>
      <Link key={post.id} className="block border-b px-4 py-3" to={`/users/${user.id}/posts/${post.id}`}>
        {post.title}
      </Link>
    )}
  </div>
)

const PostsList = ({ user, posts }) => {
  return posts === null ? (
    <Loading />
  ) : (
    posts.length < 1 ? <Placeholder /> : <Body user={user} posts={posts} />
  )
}

export default PostsList
