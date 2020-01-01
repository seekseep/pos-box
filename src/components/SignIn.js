import React from 'react'
import * as Icons from 'react-feather'
import { Link } from 'react-router-dom'

import Button from './Button'
import Form, { Field, Label, Input, Alert, Note } from './Form'

import { signIn } from '../contexts/auth'

export default function SignUp () {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const changeEmailHandler = event => setEmail(event.target.value)
  const changePasswordHandler = event => setPassword(event.target.value)

  const isSubmittable = React.useMemo(() => !!(email && password && password.length > 7 && !isProcessing), [email, password, isProcessing])
  const submitButtonLabel = React.useMemo(() => {
    if (isProcessing) {
      return 'ログイン中'
    } else if (isSubmittable) {
      return 'ログイン'
    } else {
      return '入力してください'
    }
  }, [isProcessing, isSubmittable])

  const submitHandler = async event => {
    event.preventDefault()
    if (!isSubmittable) return
    setIsProcessing(true)
    try {
      await signIn(email, password)
    } catch (error) {
      setError(error)
      throw error
    }
    setIsProcessing(false)
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col">
      <div className="flex justify-start items-center">
        <Link className="p-3" to="/">
          <Icons.X />
        </Link>
      </div>
      <div className="text-lg py-8 text-center text-2xl font-bold">ログイン</div>
      <Form className="flex-grow p-4 flex flex-col justify-center" onSubmit={submitHandler}>
        <div className="flex-grow">
          <Field>
            <Label htmlFor="signUpEmailInput">メールアドレス</Label>
            <Input required id="signUpEmailInput" type="email" placeholder="あなたのメールアドレス" value={email} onChange={changeEmailHandler} />
          </Field>
          <Field>
            <Label htmlFor="signUpPasswordInput">パスワード</Label>
            <Input required id="signUpPasswordInput" type="password" placeholder="パスワード" value={password} onChange={changePasswordHandler} />
            <Note><Link className="py-2 text-sm text-gray-600" to="/forgot">パスワードをお忘れですか？</Link></Note>
          </Field>
        </div>
        <Alert type="error" message={error ? error.message : error } />
        <Button type="submit" disabled={!isSubmittable}>{submitButtonLabel}</Button>
      </Form>
      <div className="pb-4 px-4 text-center text-sm">
        <span className="text-gray-500">アカウントをお持ちではないですか？</span>
        <Link className="p-2 inline-block" to="/signup">アカウントを作成</Link>
      </div>
    </div>
  )
}
