import { NavLink, Link } from 'react-router-dom'
import { IoLogOut } from 'react-icons/io5'
export default function Header() {
  const isLoggedIn = localStorage.getItem('loggedin')
  function fakeLogout() {
    localStorage.removeItem('loggedin')
  }
  return (
    <header className="header">
      <NavLink to="/" className="logo">
        #VANLIFE
      </NavLink>
      <nav>
        <NavLink to="/host">Host</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/vans">Vans</NavLink>
        {!isLoggedIn && (
          <Link to="login" className="login-link">
            <img src="/avatar-icon.png" className="login-icon" />
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/">
            <IoLogOut className="logout" onClick={fakeLogout} />
          </Link>
        )}
      </nav>
    </header>
  )
}
