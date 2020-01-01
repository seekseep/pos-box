import React from 'react'

import { signOut } from '../contexts/auth'

export default function SignOut () {
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    if (isMounted) return
    signOut()
    setIsMounted(true)
  }, [isMounted])
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <div className="text-gray-500">ログアウト中</div>
    </div>
  )
}
