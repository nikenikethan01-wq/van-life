import { useOutletContext } from 'react-router-dom'

export default function HostVanPricing() {
  const currentVan = useOutletContext()
  return (
    <h2 className="van-price">
      ${currentVan.price}.00<span>/day</span>
    </h2>
  )
}
