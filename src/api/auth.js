import { auth } from './firebase'

export const getCurrentUser = () => auth.currentUser

export const signUp = async (email, password) => {
  const userCredential = await auth.createUserWithEmailAndPassword(email, password)
  return userCredential
}

export const signIn = async (email, password) => {
  await auth.signInWithEmailAndPassword(email, password)
}

export const signOut = async () => {
  auth.signOut()
}

export const resetPassword = async email => {
  await auth.sendPasswordResetEmail(email)
}

export const onAuthStateChanged = (observer, error, completed) => {
  return auth.onAuthStateChanged(observer, error, completed)
}
