import React from 'react'
import context, { useAuth } from '../contexts/auth'

const Provider = ({ children }) => {
  const { user, isReady, error } = useAuth()
  return (
    <context.Provider value={{ isReady, user, error }}>
      {children}
    </context.Provider>
  )
}

export default Provider
