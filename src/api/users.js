import { firestore } from './firebase'

const buildDocRef = id => firestore.doc(`users/${id}`)

const buildUserWithDocRef = async docRef => {
  const doc = await docRef.get()
  return buildUser(doc)
}

const buildUser = doc => {
  return {
    id: doc.id,
    ...doc.data()
  }
}

export const create = async ({ id, ...data }) => {
  const docRef = buildDocRef(id)
  await docRef.set({
    createAt: new Date(),
    ...data
  })
  const user = await buildUserWithDocRef(docRef)
  return user
}

export const update = async ({ id, ...data }) => {
  const docRef = buildDocRef(id)
  await docRef.update(data)
  const user = await buildUserWithDocRef(docRef)
  return user
}

export const get = async id => {
  const docRef = buildDocRef(id)
  const user = await buildUserWithDocRef(docRef)
  return user
}

export const subscribeByID = (id, callback, onError) => {
  return buildDocRef(id).onSnapshot(async doc => {
    const user = buildUser(doc)
    callback(user)
  }, onError)
}
