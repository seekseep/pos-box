import React from 'react'
import * as authAPI from '../api/auth'
import * as usersAPI from '../api/users'

const TAG = 'context/auth'

const context = React.createContext({
  user: null,
  isReady: null,
  error: null
})

export const useUser = () => {
  const { user } = React.useContext(context)
  return user
}

export const useIsReady = () => {
  const { isReady } = React.useContext(context)
  return isReady
}

export const useError = () => {
  const { error } = React.useContext(context)
  return error
}

export const signUp = async (email, password, displayName) => {
  const userCredential = await authAPI.signUp(email, password)
  const id = userCredential.user.uid
  await usersAPI.create({ id, displayName })
}

export const signIn = async (email, password) => {
  await authAPI.signIn(email, password)
}

export const signOut = async () => {
  await authAPI.signOut()
}

export const resetPassword = async email => {
  await authAPI.resetPassword(email)
}

export const useAuth = () => {
  const [user, setUser] = React.useState(authAPI.getCurrentUser())
  const [isReady, setIsReady] = React.useState(null)
  const [error, setError] = React.useState(null)

  const onAuthStateChangedHandler = React.useCallback((user) => {
    console.log(`[${TAG}] auth state change handler`, { user })
    setUser(user)
    setIsReady(true)
  }, [])

  function onErrorHandler (error) {
    setError(error)
    throw error
  }

  React.useEffect(() => {
    console.log(`[${TAG}] subscribe`)
    const unsubscribe = authAPI.onAuthStateChanged(onAuthStateChangedHandler, onErrorHandler)
    return () => {
      console.log(`[${TAG}] unsubscribe`)
      unsubscribe()
    }
  }, [onAuthStateChangedHandler])

  return { user, isReady, error }
}

export default context
