import React from 'react'
import * as Icons from 'react-feather'
import { Redirect } from 'react-router-dom'
import PageHeader, { Action, Title } from './PageHeader'

import { useUser, createPost } from '../contexts/me'

import Form, { Field, Input, TextArea, Alert } from './Form'
import Button from './Button'

const CreatePostForm = ({ user }) => {
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')
  const [createdPost, setCreatedPost] = React.useState(null)

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [error, setError] = React.useState(false)

  const isSubmittable = React.useMemo(() => !!(title && body && !isProcessing), [body, isProcessing, title])
  const submitButtonLabel = React.useMemo(() => {
    if (isSubmittable) {
      return '記事を作成する'
    } else if (isProcessing) {
      return '記事を作成中'
    } else {
      return '入力してください'
    }
  }, [isProcessing, isSubmittable])

  const changeTitleHander = event => setTitle(event.target.value)
  const changeBodyHandler = event => setBody(event.target.value)
  const submitHandler = async event => {
    event.preventDefault()
    if (!isSubmittable) return
    setIsProcessing(true)
    setError(null)
    setCreatedPost(null)
    try {
      const createdPost = await createPost(user.id, { title, body })
      setCreatedPost(createdPost)
    } catch (error) {
      setError(error)
      throw error
    }
    setIsProcessing(false)
  }

  if (createdPost) {
    return <Redirect to={`/users/${user.id}/posts/${createdPost.id}`} />
  }

  return (
    <Form className="flex-grow flex flex-col p-4" onSubmit={submitHandler}>
      <div className="flex-grow flex flex-col">
        <Field>
          <Input required value={title} onChange={changeTitleHander} className="text-lg" placeholder="タイトル" />
        </Field>
        <Field className="flex-grow flex flex-col">
          <TextArea placeholder="本文" required value={body} onChange={changeBodyHandler} className="flex-grow" />
        </Field>
      </div>
      <Alert type="error" message={error ? error.message : error} />
      <Button disabled={!isSubmittable} type="submit">{submitButtonLabel}</Button>
    </Form>
  )
}

export default function CreatePost () {
  const user = useUser()
  return (
    <div className="flex flex-col min-h-screen items-streach">
      <PageHeader>
        <Action to="/"><Icons.ArrowLeft /></Action>
        <Title>記事の作成</Title>
      </PageHeader>
      {user ? <CreatePostForm user={user} /> : null }
    </div>
  )
}
