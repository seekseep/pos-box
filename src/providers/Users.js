import React from 'react'
import context, { useUsers } from '../contexts/users'

const Provider = ({ children }) => {
  const { users, setUser, setPost, setPosts } = useUsers()
  return (
    <context.Provider value={{ users, setUser, setPost, setPosts }}>
      {children}
    </context.Provider>
  )
}

export default Provider
