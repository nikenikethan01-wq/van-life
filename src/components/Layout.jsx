import Header from './Header'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()

  return (
    <>
      <Header />
      <main className="page-content page-transition" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
