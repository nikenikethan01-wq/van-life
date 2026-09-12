import React from 'react'
import { loginUser } from '../api'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: '',
    password: '',
  })
  const [error, setError] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  const location = useLocation()
  const navigate = useNavigate()
  const redirectPath = location.state?.path || '/host'

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setStatus('submitting')
      await loginUser(loginFormData)
      setError(null)
      localStorage.setItem('loggedin', true)
      navigate(redirectPath, { replace: true })
    } catch (err) {
      console.log(err)
      setError(err)
    } finally {
      setStatus('idle')
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const loginTitle = location.state?.message || 'Sign in to your account'

  return (
    <div className="login-container">
      <h1>{loginTitle}</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />

        <button disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Logging in' : 'Log in'}
        </button>
        {error && <h3>There was an error : {error.message}</h3>}
      </form>
    </div>
  )
}
