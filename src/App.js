import { useState } from 'react';
import './App.css';
import './index.css';

function App() {

  const [input, setInput] = useState("")
  const [cityName, setCityName] = useState("") 
  const [temperature, setTemperature] = useState("") 
  const [humidityValue, setHumidity] = useState("") 
  const [tempMax, setTempMax] = useState("") 
  const [tempMin, setTempMin] = useState("") 
  const [country, setCountry] = useState("") 
  const [weatherDescription, setWeatherDescription] = useState("") 
  const [weather, setWeather] = useState("") 
  const [windSpeed, setWindSpeed] = useState("") 
  
  const handleInput= (e) =>{
    setInput(e.target.value)
  }

  const clearData= () =>{
    setInput("")
    setCityName("")
    setTemperature("")
    setHumidity("")
    setTempMax("")
    setTempMin("")
    setCountry("")
    setWeatherDescription("")
    setWindSpeed("")
    setWeather("")
    const appDiv = document.getElementById('app');
    appDiv.classList.add('App')

  }

    async function getWeather() {
      const api_endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=3a66480e84e4eb49e86a919b1fd27ce3&units=metric`;
  
      try {
          const response = await fetch(api_endpoint);
          if (response.ok) {
              const responseData = await response.json();
              setCityName(responseData.name)
              setTemperature(responseData.main.temp)
              setHumidity(responseData.main.humidity)
              setTempMax(responseData.main.temp_max)
              setTempMin(responseData.main.temp_min)
              setTempMin(responseData.main.temp_min)
              setCountry(responseData.sys.country)
              setWindSpeed(responseData.wind.speed)
              setWeatherDescription(responseData.weather[0].description)
              setWeather(responseData.weather[0].main)
              
              console.log(responseData); // You can process the data here
            } else {
              console.error('Error fetching weather data:', response.status);
            }
          } catch (error) {
            if(weatherDescription === "broken clouds" || weatherDescription === "mist" ){
              const appDiv = document.querySelector('.App');
              appDiv.classList.remove('App')
              appDiv.classList.add('custom_background')
              console.log("mist/fog")
            }
            else{
              const appDiv = document.querySelector('.custom_background');
              appDiv.classList.remove('custom_background')
              appDiv.classList.add('App')
              console.log("not mist/fog")
            }
            console.error('An error occurred while fetching weather data:', error);
          }
        }

    // useEffect(()=>{
    //   }},[weatherDescription])

    return (
    <div className="App" id='app'>
      <div className='input_and_buttons'>
        <div className='input_and_search'>
          <input className='input_field' type='text' value={input} autoComplete='off' placeholder='Enter a city' onChange={handleInput}></input>
          <button className='search_button' type='submit' onClick={getWeather}>Search</button>
        </div>
        <button onClick={clearData}>Clear</button>
      </div>
      <div>
        <p className='locationName'>{cityName ===""? "":`${cityName}, ${country}`}</p>
        <p className='temperature'>{temperature ===""? "":`${temperature}°`}</p>
        <p className='weather'>{weather}</p>
        <p className='description'>{weatherDescription}</p>
        <div className='highest_and_lowest_temperature'>
          <p className='max_temp'>{tempMax===""?"":`H: ${tempMax}°`}</p>
          <p className='min_temp'>{tempMin===""?"":`L: ${tempMin}°`}</p>
        </div>
        <p>{humidityValue === "" ? "":`Humidity: ${humidityValue}%`}</p>
        <p>{windSpeed===""?"":`Wind speed: ${windSpeed}mph`}</p>
      </div>
    </div>
  );
}

export default App;