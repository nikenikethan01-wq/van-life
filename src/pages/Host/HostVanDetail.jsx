import { useParams, Link, Outlet, NavLink } from 'react-router-dom'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { getHostVans } from '../../api'

export default function HostVanDetail() {
  const { id } = useParams()
  const [currentVan, setCurrentVan] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  console.log('Render')

  React.useEffect(() => {
    async function loadVans() {
      console.log('effect')
      setLoading(true)
      try {
        const data = await getHostVans(id)
        setCurrentVan(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadVans()
  }, [id])

  if (loading) {
    return <h1 className="loading">Loading...</h1>
  }

  if (error) {
    return <h1>There was an error : {error.message}</h1>
  }

  return (
    <>
      {currentVan && (
        <>
          <Link to=".." relative="path" className="back-button">
            <FontAwesomeIcon icon={faArrowLeftLong} />
            <span> Back to all vans</span>
          </Link>
          <section className="host-van-detail">
            <div className="host-van-detail-container">
              <img src={currentVan.imageUrl} height={160} />
              <div>
                <i className={`van-type ${currentVan.type} selected`}>
                  {currentVan.type}
                </i>
                <h2>{currentVan.name}</h2>
                <p>{`$${currentVan.price}/day`}</p>
              </div>
            </div>
            <nav>
              <NavLink to="." end>
                Details
              </NavLink>
              <NavLink to="pricing">Pricing</NavLink>
              <NavLink to="photos">Photos</NavLink>
            </nav>
            <Outlet context={currentVan} />
          </section>
        </>
      )}
    </>
  )
}
