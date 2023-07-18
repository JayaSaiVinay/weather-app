import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { GridLoader } from "react-spinners";
const KEY = "6e7bfe9e633e427a950150919231607";
// const QUERY = "Amalapuram";
export default function App() {
  const [query, setQuery] = useState("");
  const [areaName, setAreaName] = useState("");
  return (
    <div className="container">
      <Header />
      <Main
        setQuery={setQuery}
        query={query}
        setAreaName={setAreaName}
        areaName={areaName}
      />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <p>
        React Weather{" "}
        <span>
          <FontAwesomeIcon icon={faCloud} />
        </span>
      </p>
    </header>
  );
}

function Main({ query, setQuery, setAreaName, areaName }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setAreaName(query);
  }
  useEffect(
    function () {
      async function fetchWeatherData() {
        if (areaName === "") {
          return;
        }
        setIsLoading(true);
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${areaName}&aqi=no`
        );
        if (!res.ok){
          return;
        }
        const data = await res.json();
        setData(data);
        setIsLoading(false);
        console.log(data);
      }
      fetchWeatherData();
    },
    [areaName]
  );

  return (
    <main>
      <div className="search-container">
        <form
          action="submit"
          className="search-bar"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            placeholder="Search the Area"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      {data.length !== 0 ? (
        <div className="weather-data">
          <p className="location">
            {data.location.name}, {data.location.region},{" "}
            {data.location.country}
          </p>
          <div className="current-weather">
            <p className="nowrap">
              Current Weather - <span>{data.current.condition.text}</span>
            </p>
            <img src={data.current.condition.icon} />
          </div>
          <div className="additonal-info">
            <p>Temperature is {data.current.temp_c}&#xb0;</p>
            <p>Feels like {data.current.feelslike_c}&#xb0;</p>
            <p>Pressure - {data.current.pressure_in}</p>
            <p>Humidity - {data.current.humidity}</p>
          </div>
          <p>Last Updated at {data.current.last_updated}</p>
        </div>
      ) : isLoading ? (
        <GridLoader
          color={'#e27d60'}
          loading={isLoading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="alternate">
          <p>
            Search to know weather in your{" "}
            <span className="nowrap">city / area</span>
          </p>
        </div>
      )}
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <p>
        Made by JayaSaiVinay
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 496 512"
        >
          <path  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
      </p>
    </footer>
  );
}
