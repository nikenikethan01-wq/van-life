import { NavLink } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="page-404">
      <h1>Sorry, the page you were looking for was not found</h1>
      <NavLink to="/">Return to home</NavLink>
    </section>
  )
}
