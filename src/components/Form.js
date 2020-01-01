import React from 'react'
import styled from 'styled-components'

const Form = styled.form.attrs(({ className }) => ({
  className
}))``

export const Field = styled.div.attrs(({ className }) => ({
  className: `${className} mb-4`
}))``

export const Label = styled.label.attrs(({ className }) => ({
  className: `${className} block w-full mb-2`
}))``

export const Input = styled.input.attrs(({ className }) => ({
  className: `${className} block w-full border rounded p-2`
}))``

export const TextArea = styled.textarea.attrs(({ className }) => ({
  className: `${className} block w-full border rounded p-2`
}))``

export const Note = styled.div.attrs(({ className }) => ({
  className: `${className} py-2`
}))``

const buildAlertClassName = type => {
  var className = 'border rounded mb-4 p-2 text-xs '
  switch (type) {
    case 'succeed':
      className += ' bg-green-200 border-green-400 text-green-500'
      break
    case 'error':
      className += ' bg-red-200 border-red-400 text-red-500'
      break
    default:
  }
  return className
}

export const Alert = ({ type, message }) => message ? (
  <div className={buildAlertClassName(type)}>{message}</div>
) : null

export default Form
