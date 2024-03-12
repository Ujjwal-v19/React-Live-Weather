import React, { useEffect, useState } from "react";

function TempApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("mumbai");

  useEffect(() => {
    async function fetchApi() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=21ef90cf00d4107d5e3546bd250a1cb4`;
      const response = await fetch(url);
      const resJson = await response.json();

      // Update state with the entire weather data
      setWeatherData(resJson);
    };

    fetchApi();
  }, [search]); // Run the effect only when the 'search' value changes

  return (
    <>
      <div className="box">
        <div className="inputData">
          <h2>Live Weather</h2>
          <input
            type="search"
            className="inputField"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="info">
            {weatherData ? (
              <>
                <h2 className="location">
                  <i className="fa-solid fa-street-view"></i>
                  {weatherData.name ? weatherData.name : "City Name Unavailable"}
                </h2>
                <h1 className="temp">
                  {weatherData.main && weatherData.main.temp !== undefined
                    ? weatherData.main.temp
                    : "Temperature Unavailable"}°C
                </h1>
                <h3 className="tempmin_max">
                  min: {weatherData.main && weatherData.main.temp_min !== undefined ? weatherData.main.temp_min : "N/A"}°C,
                  max: {weatherData.main && weatherData.main.temp_max !== undefined ? weatherData.main.temp_max : "N/A"}°C
                </h3>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TempApp;
