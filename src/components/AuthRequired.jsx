import { Outlet, Navigate, useLocation } from 'react-router-dom'

export default function AuthRequired() {
  const isLoggedIn = localStorage.getItem('loggedin')
  const location = useLocation()
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          message: 'You must login in first',
          path: location.pathname,
        }}
      />
    )
  }

  return <Outlet />
}
