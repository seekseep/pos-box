import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom'
import * as Icons from 'react-feather'

var c = 0

var listeners = []

const subscribe = (callback) => {
  listeners.push(callback)
  const unsubscribe = () => {
    listeners = listeners.filter(f => f !== callback)
  }
  return unsubscribe
}

setInterval(() => {
  c += Math.floor(Math.random() * 10)
  listeners.forEach(callback => callback(c))
}, 500)

const Counter = () => {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    console.log('called React.useEffect (Counter)')
    return () => console.log('called cleanup (Counter)')
  }, [])

  return (
    <div className="flex mb-4">
      <div className="text-3xl font-bold mr-4">{count}</div>
      <button onClick={() => setCount(count + 1)} className="p-2 rounded bg-gray-200">
        <Icons.Plus/>
      </button>
    </div>

  )
}

function PageA () {
  const [message, setMessage] = React.useState('')

  React.useEffect(() => {
    console.log('called React.useEffect (A)')
    subscribe((message) => setMessage(message))
    return () => console.log('called cleanup (A)')
  }, [])

  return (
    <div className="p-8">
      <div className="text-4xl font-bold mb-4">PageA</div>

      <div className="text-center text-xl font-bold py-8">
        {message}
      </div>

      <Counter />
      <Link className="rounded px-3 py-2 bg-gray-200 inline-block" to="/b">To B</Link>
    </div>
  )
}

function PageB () {
  React.useEffect(() => {
    console.log('called React.useEffect (B)')
  }, [])
  return (
    <div className="p-8">
      <div className="text-4xl font-bold mb-4">PageB</div>
      <Link className="rounded px-3 py-2 bg-gray-200 inline-block" to="/a">To A</Link>
    </div>
  )
}

function TestContents () {
  return (
    <Router>
      <Switch>
        <Route path="/a" component={PageA} />
        <Route path="/b" component={PageB} />
        <Redirect to="/a" />
      </Switch>
    </Router>
  )
}

export default TestContents
