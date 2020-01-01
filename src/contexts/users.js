import React from 'react'
import * as usersAPI from '../api/users'
import * as postsAPI from '../api/posts'

const context = React.createContext({
  users: {}
})

export const useUser = id => {
  const [isMounted, setIsMounted] = React.useState(false)
  const { users, setUser } = React.useContext(context)

  React.useEffect(() => {
    if (isMounted) return

    async function fetch (id) {
      const user = await usersAPI.get(id)
      const posts = await postsAPI.getByUserID(id)

      setUser({
        ...user,
        posts
      })
    }
    fetch(id)

    setIsMounted(true)
  }, [id, isMounted, setUser])

  const user = users[id] || null
  return user
}

export const usePost = (id, postID) => {
  const { users } = React.useContext(context)
  const user = users[id] || null
  const post = user ? user.posts[postID] : null
  return post
}

export const useUsers = () => {
  const [users, setUsers] = React.useState({})

  function setUser (user) {
    const oldUser = users[user.id] || {}
    const newUser = { ...oldUser, ...user }
    setUsers({
      ...users,
      [newUser.id]: newUser
    })
  }

  return { users, setUser }
}

export default context
