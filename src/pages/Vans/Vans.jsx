import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getVans } from '../../api'

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [vans, setVans] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const typeFilter = searchParams.get('type')

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true)
      try {
        const data = await getVans()
        setVans(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadVans()
  }, [])

  const displayEl = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
    : vans

  const vanElements = displayEl.map((van) => (
    <div className="van-tile" key={van.id}>
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
        aria-label={`View details for ${van.name}, 
                 priced at $${van.price} per day`}
      >
        <img src={van.imageUrl} alt={`Image of ${van.name}`} />
        <div className="van-info">
          <h2>{van.name}</h2>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type}`}>{van.type}</i>
      </Link>
    </div>
  ))

  if (loading) {
    return <h1 className="loading">Loading...</h1>
  }

  if (error) {
    return <h1 className="error">There was an error : {error.message}</h1>
  }

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="filter-vans">
        <button
          className="van-filter"
          onClick={() => handleFilterChange('type', 'simple')}
        >
          Simple
        </button>
        <button
          className="van-filter"
          onClick={() => handleFilterChange('type', 'luxury')}
        >
          Luxury
        </button>
        <button
          className="van-filter"
          onClick={() => handleFilterChange('type', 'rugged')}
        >
          Rugged
        </button>
        {typeFilter && (
          <button
            className="clear-filter"
            onClick={() => handleFilterChange('type', null)}
          >
            Clear Filter
          </button>
        )}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  )
}
