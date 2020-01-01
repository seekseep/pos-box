import React from 'react'
import { LinkButton } from './Button'

export default function Welcome () {
  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center mb-4">
        <div className="text-center font-bold text-3xl mb-2">PosBox</div>
        <div className="text-center text-gray-700">普通のブログサービス</div>
      </div>
      <div className="flex px-2 pb-4">
        <div className="px-2 w-1/2">
          <LinkButton to="/signup">アカウント作成</LinkButton>
        </div>
        <div className="px-2 w-1/2">
          <LinkButton color="secondary" to="/signin">ログイン</LinkButton>
        </div>
      </div>
    </div>
  )
}
