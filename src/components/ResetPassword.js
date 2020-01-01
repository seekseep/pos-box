import React from 'react'
import * as Icons from 'react-feather'
import { Link } from 'react-router-dom'

import Button from './Button'
import Form, { Field, Label, Input, Alert } from './Form'

import { resetPassword } from '../contexts/auth'

export default function SignUp () {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState(null)
  const [isSucceed, setIsSucceed] = React.useState(false)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const changeEmailHandler = event => setEmail(event.target.value)

  const isSubmittable = React.useMemo(() => !!(email && !isProcessing), [email, isProcessing])
  const submitButtonLabel = React.useMemo(() => {
    if (isProcessing) {
      return '処理中'
    } else if (isSubmittable) {
      return 'パスワードを再発行'
    } else {
      return '入力してください'
    }
  }, [isProcessing, isSubmittable])

  const submitHandler = async event => {
    event.preventDefault()
    if (!isSubmittable) return
    setIsProcessing(true)
    setError(null)
    setIsSucceed(false)
    try {
      await resetPassword(email)
      setIsSucceed(true)
    } catch (error) {
      setError(error)
      throw error
    }
    setIsProcessing(false)
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col">
      <div className="flex justify-start items-center">
        <Link className="p-3" to="/signIn">
          <Icons.ArrowLeft />
        </Link>
      </div>
      <div className="text-lg py-8 text-center text-2xl font-bold">パスワード再発行</div>
      <Form className="flex-grow p-4 flex flex-col justify-center" onSubmit={submitHandler}>
        <div className="flex-grow">
          <Field>
            <Label htmlFor="signUpEmailInput">登録したメールアドレス</Label>
            <Input required id="signUpEmailInput" type="email" placeholder="あなたのメールアドレス" value={email} onChange={changeEmailHandler} />
          </Field>
        </div>
        <Alert type="succeed" message={isSucceed ? '登録したアドレスにメールを送りました' : null } />
        <Alert type="error" message={error ? error.message : error } />
        <Button type="submit" disabled={!isSubmittable}>{submitButtonLabel}</Button>
      </Form>
    </div>
  )
}
