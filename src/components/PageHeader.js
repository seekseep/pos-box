import React from 'react'
import { Link } from 'react-router-dom'

export const Action = ({ to, children }) => (
  <Link className="p-3" to={to}>{children}</Link>
)

export const Title = ({ children }) => (
  <div className="text-lg mx-4 flex-grow font-bold">{children}</div>
)

const PageHeader = ({ children }) => (
  <div className="border-b bg-white" style={{ position: 'sticky', top: 0 }}>
    <div className="max-w-lg mx-auto flex items-center">
      {children}
    </div>
  </div>
)

export default PageHeader
