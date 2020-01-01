import React from 'react'

import { useError } from '../contexts/auth'

export default function ErrorAlert () {
  const error = useError()
  return error ? (
    <div>
      ErrorAlert
    </div>
  ) : null
}
