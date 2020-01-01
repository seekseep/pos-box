import React from 'react'
import { useUser } from '../contexts/auth'
import context, { useMe } from '../contexts/me'

const Provider = ({ children }) => {
  const { uid } = useUser()
  const { user, posts, error } = useMe(uid)
  return (
    <context.Provider value={{ user, posts, error }}>
      {children}
    </context.Provider>
  )
}

export default Provider
