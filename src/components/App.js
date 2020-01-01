import React from 'react'

import Provider from '../providers/Auth'

import Contents from './Contents'
import Splash from './Splash'
import ErrorAlert from './ErrorAlert'

function App () {
  return (
    <Provider>
      <Contents />
      <Splash />
      <ErrorAlert />
    </Provider>
  )
}

export default App
