import React from 'react'
import { Link } from 'react-router-dom'
export default function HostVans() {
  const [hostVans, setHostVans] = React.useState([])
  React.useEffect(() => {
    fetch(`/api/host/vans`)
      .then((res) => res.json())
      .then((data) => setHostVans(data.vans))
  }, [])
  const renderEl = hostVans.map((van) => {
    return (
      <div key={van.id} className="van-container">
        <Link to={van.id}>
          <img src={van.imageUrl} alt={`${van.name} van`} height={66} />
          <div className="van-details">
            <h3>{van.name}</h3>
            <p>{`$${van.price}/day`}</p>
          </div>
        </Link>
      </div>
    )
  })

  return (
    <section className="host-vans-container">
      <h2 className="host-vans-heading">Your listed vans</h2>
      {hostVans.length > 0 ? renderEl : <h2 className="loading">Loading...</h2>}
    </section>
  )
}
