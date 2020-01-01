import React from 'react'
import styled, { css } from 'styled-components'

import { useIsReady } from '../contexts/auth'

const readyStyle = css`
  opacity: 0;
  top: -100%;
  transition:
    top 0s linear .5s,
    opacity .5s ease 0s;
`

const notReadyStyle = css`
  opacity: 1;
  top: 0%;
  transition:
    top 0s linear .5s,
    opacity .5s ease 0s;
`

const Root = styled.div`
  ${({ isReady }) => isReady ? readyStyle : notReadyStyle};
`

export default function Splash () {
  const isReady = useIsReady()
  return (
    <Root isReady={isReady}
      className="fixed w-full h-full flex flex-col items-center justify-center p-4 bg-white">
      <div className="font-bold text-xl">PosBox</div>
    </Root>
  )
}
