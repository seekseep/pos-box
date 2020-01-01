import React from 'react'
import * as Icons from 'react-feather'
import PageHeader, { Action, Title } from './PageHeader'

import { useUser, updateProfile } from '../contexts/me'

import Form, { Field, Label, Input, Alert } from './Form'
import Button from './Button'

const UpdateProfileForm = ({ user }) => {
  const [displayName, setDisplayName] = React.useState(user.displayName)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isSucceed, setIsSucceed] = React.useState(false)
  const [error, setError] = React.useState(false)

  const isSubmittable = React.useMemo(() => !!(displayName && !isProcessing && displayName !== user.displayName), [displayName, isProcessing, user.displayName])
  const submitButtonLabel = React.useMemo(() => {
    if (isSubmittable) {
      return '更新する'
    } else if (isProcessing) {
      return '更新中'
    } else {
      return '入力してください'
    }
  }, [isProcessing, isSubmittable])

  const changeDisplayNameHandler = event => setDisplayName(event.target.value)
  const submitHandler = async event => {
    event.preventDefault()
    if (!isSubmittable) return
    setIsProcessing(true)
    setError(null)
    setIsSucceed(false)
    try {
      await updateProfile({
        ...user,
        displayName
      })
      setIsSucceed(true)
    } catch (error) {
      setError(error)
      throw error
    }
    setIsProcessing(false)
  }

  return (
    <Form className="flex-grow flex flex-col p-4" onSubmit={submitHandler}>
      <div className="flex-grow">
        <Field>
          <Label>名前</Label>
          <Input
            placholder="あなたの名前" required
            value={displayName} onChange={changeDisplayNameHandler} />
        </Field>
      </div>
      <Alert type="succeed" message={isSucceed ? 'プロフィールを更新しました' : null} />
      <Alert type="error" message={error ? error.message : error} />
      <Button disabled={!isSubmittable} type="submit">{submitButtonLabel}</Button>
    </Form>
  )
}

export default function UpdateProfile () {
  const user = useUser()
  return (
    <div className="flex flex-col min-h-screen items-streach">
      <PageHeader>
        <Action to="/settings"><Icons.ArrowLeft /></Action>
        <Title>プロフィールの変更</Title>
      </PageHeader>
      {user ? <UpdateProfileForm user={user} /> : null }
    </div>
  )
}
