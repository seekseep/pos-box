import React from 'react'
import * as postsAPI from '../api/posts'
import * as usersAPI from '../api/users'

const TAG = 'context/me'

const context = React.createContext({
  user: null,
  posts: null,
  error: null
})

export const updateProfile = async user => {
  await usersAPI.update(user)
}

export const createPost = async (userID, post) => {
  const createdPost = await postsAPI.create(userID, post)
  return createdPost
}

export const useUser = () => {
  const { user } = React.useContext(context)
  return user
}

export const usePosts = () => {
  const { posts } = React.useContext(context)
  return posts ? Object.values(posts) : null
}

export const useError = () => {
  const { error } = React.useContext(context)
  return error
}

function postsReducer (state, action) {
  switch (action.type) {
    case 'me/posts/setEmpty': {
      return {}
    }
    case 'me/posts/set': {
      const { post } = action.payload
      return {
        ...state,
        [post.id]: post
      }
    }
    default :
      return state
  }
}

export const useMe = userID => {
  const [user, setUser] = React.useState(null)
  const [posts, dispatch] = React.useReducer(postsReducer, null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    console.log(`[${TAG}] subscribe user`)
    const unsubscribe = usersAPI.subscribeByID(userID, user => setUser(user), error => setError(error))
    return () => {
      console.log(`[${TAG}] unsubscribe user`)
      unsubscribe()
    }
  }, [userID])

  React.useEffect(() => {
    console.log(`[${TAG}] subscribe posts`)
    const unsubscribe = postsAPI.subscribeByUserID(userID, post => {
      if (post === null) {
        dispatch({ type: 'me/posts/setEmpty' })
        return
      }
      dispatch({ type: 'me/posts/set', payload: { post } })
    }, error => setError(error))
    return () => {
      console.log(`[${TAG}] unsubscribe posts`)
      unsubscribe()
    }
  }, [userID])

  return { user, posts, error }
}

export default context
