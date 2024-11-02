import React, { useState } from 'react'
import "./Golal.css"
import { FaMapLocationDot } from "react-icons/fa6";
import { CiTempHigh } from "react-icons/ci";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
const Weather = () => {
  let [weatherData, setWeatherData] = useState(null)
  let [city, setCity] = useState("")
  let [detail, setdetail] = useState(false)
  let [found,setFound]=useState("start")
  console.log(found)
  let fetchApi = async () => {
    let apikey = "9d4afb65075749db58867ab7a3aac856"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    try {
      let data = await fetch(apiUrl);
      let finalData = await data.json()
      console.log(finalData)
      if (finalData.cod === 200) {
        setWeatherData(finalData)
        setFound(true)
      } else {
        setWeatherData(null)
        setFound(false)
      }
    } catch (error) {
      console.log(error, apiUrl)
    }
  }
  return (
    <div className='main'>
      <div className='search'><input type="text" placeholder='Enter City Name' onChange={(e) => setCity(e.target.value)} /> <button onClick={fetchApi}>Get Weather</button></div>
      {weatherData ? (<div className='weatherCard'>
        <h3>City: {weatherData.name} <FaMapLocationDot /> </h3>
        <h4>Temparature <CiTempHigh /></h4>
        <h1>{weatherData.main.temp} <TbTemperatureCelsius /> <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" className='image'/></h1>
        <h2>Country Code: {weatherData.sys.country}</h2>
        <p>Weather Description : {weatherData.weather[0].description}</p>
        {detail ? <div className='det'>
          <div className='det1'>
            <h5>Minimum temparature: <span>{weatherData.main.temp_min}<TbTemperatureCelsius /></span></h5>
            <h5>Maximum temparature: <span>{weatherData.main.temp_max}<TbTemperatureCelsius /></span></h5>
            <h5>Pressure:<span> {weatherData.main.pressure} mb</span></h5>
            <h5>Humidity: <span>{weatherData.main.humidity}%</span></h5>
          </div>
          <div className='det2'>
            <p>Wind</p>
            <div className='indet'>
            <h5>Speed: <span>{weatherData.wind.speed} km/hr</span></h5>
            <h5>Gust:{ weatherData.wind.gust?<span>{weatherData.wind.gust} km/hr</span>: <span>---</span>} </h5>
            <h5>Degree: <span>{weatherData.wind.deg} degrees</span></h5>
            </div>
          </div>
        </div> : <></>}
        <button onClick={()=>(detail ? setdetail(false) : setdetail(true))} className='detBut'>{detail ? <FaCaretUp /> : <FaCaretDown />}</button>
      </div>): !found && <div className='weatherCarderr'><h3>City not found</h3></div>}
    </div>
  )
}
export default Weather
