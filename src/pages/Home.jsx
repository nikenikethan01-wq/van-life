import Header from '../Header'
import Footer from '../Footer'
export default function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <h1>You got the travel plans, we got the travel vans.</h1>
        <p>
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <button>Find your van</button>
      </div>
      <Footer />
    </>
  )
}
