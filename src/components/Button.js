import styled from 'styled-components'
import { Link } from 'react-router-dom'

const defaultClassName = 'block w-full rounded p-2 text-center text-sm border-2 rounded'

function buildClassName ({ disabled, color }) {
  var className = defaultClassName

  if (!color || color === 'primary') {
    className += ' border-blue-500 bg-blue-500 text-white'
  } else if (color === 'secondary') {
    className += ' border-blue-500 bg-white text-blue-500'
  }

  if (disabled) {
    className += ' opacity-50'
  }

  return className
}

export const LinkButton = styled(Link).attrs(props => ({
  className: buildClassName(props)
}))``

const Button = styled.button.attrs(props => ({
  className: buildClassName(props)
}))``

export default Button
