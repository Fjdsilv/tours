import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Tours from "./components/Tours";

const url = 'https://www.course-api.com/react-tours-project';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) =>
  {
    const newTours = tours.filter((tour) => {
      return tour.id !== id;
    })
    setTours(newTours);
  }

  const fetTours = async () => 
  {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const tours = await response.json();
      setTours(tours)
    } catch(error) {
      console.log(error);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetTours()
  },[])

  if (isLoading) {
    return (
      <main>
        <div className="title">
        <h2>our tours</h2>
        <div className="title-underline"></div>
        </div>
        <div className="isLoading">
        <Loading />
        </div>
      </main>
    )
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <div className="title-underline"></div>
          <button 
            style={{marginTop: "2rem"}} 
            className="btn"
            onClick={fetTours}
          >
          refresh
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  )
}

export default App