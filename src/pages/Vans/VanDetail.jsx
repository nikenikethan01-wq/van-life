import { useParams, Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
export default function VanDetail() {
  const { id } = useParams()
  const [van, setVan] = React.useState(null)
  const location = useLocation()
  React.useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans))
  }, [id])

  if (!van) {
    return <h1 className="loading">Loading...</h1>
  }

  const search = location.state?.search || ''
  const type = location.state?.type || 'all'

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        <FontAwesomeIcon icon={faArrowLeftLong} />
        <span> Back to {type} vans</span>
      </Link>
      <div className="van-detail">
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  )
}
