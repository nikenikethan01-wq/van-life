import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        #VANLIFE
      </Link>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/Vans">Vans</Link>
      </nav>
    </header>
  )
}
