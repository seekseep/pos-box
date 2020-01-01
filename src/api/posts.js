import { firestore } from './firebase'

const buildCollectionRef = (userID) => firestore.collection(`users/${userID}/posts`)
const buildDocRef = (userID, id) => firestore.doc(`users/${userID}/posts/${id}`)

const buildPostWithDocRef = async docRef => {
  const doc = await docRef.get()
  return buildPost(doc)
}

const buildPost = doc => {
  return {
    id: doc.id,
    ...doc.data()
  }
}

export const create = async (userID, data) => {
  const collectionRef = buildCollectionRef(userID)
  const docRef = await collectionRef.add({
    createdAt: new Date(),
    ...data
  })
  const post = await buildPostWithDocRef(docRef)
  return post
}

export const update = async (userID, { id, ...data }) => {
  const docRef = buildDocRef(userID, id)
  await docRef.update(data)
  const post = await buildPostWithDocRef(docRef)
  return post
}

export const get = async (userID, id) => {
  const docRef = buildDocRef(userID, id)
  const post = await buildPostWithDocRef(docRef)
  return post
}

export const getByUserID = async userID => {
  const querySnapshot = await buildCollectionRef(userID).get()

  const posts = {}

  querySnapshot.docs.forEach(doc => {
    const post = buildPost(doc)
    posts[post.id] = post
  })

  return posts
}

export const subscribeByUserID = (userID, callback, onError) => {
  return buildCollectionRef(userID).onSnapshot(querySnapshot => {
    if (querySnapshot.empty) {
      callback(null)
    }

    querySnapshot.forEach(doc => {
      const post = buildPost(doc)
      callback(post)
    })
  }, onError)
}
