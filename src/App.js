import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Api_Key = ;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      isLoading: true
    };
    
  }

  
  
  async getWeather(lat, lon) {
    console.log("first call");
    try{
      console.log("eee");
    const url = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Api_Key}`);
    const data = await url.json();
    console.log("getWeather");
    if (data.cod * 1 === 200) {
      this.setState({ 
      weather: data,
      locationName: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      isLoading: false });
    } else throw new Error(data.message)
  } catch (error) {
    
  }
}

getCurrentCoords() {
  console.log("im in getCurrentCoords ")
  navigator.geolocation.getCurrentPosition(result =>  {
    console.log("dd",result.coords.latitude,result.coords.longitude)
    this.getWeather(result.coords.latitude, result.coords.longitude)} )
}

componentDidMount(){
  this.getCurrentCoords();
}

  render() {
    return this.state.isLoading? (<h1 className="text-center text-danger my-5">Loading</h1>):(
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
            </h1>
            <h2 className="col-12">
              {this.state.weather && this.state.weather.name}
            </h2>
            <h3 className="col-12 text-danger">
              {this.state.weather && this.state.weather.main.temp}
            </h3>
            <h3 className="col-12">
              {this.state.weather && this.state.weather.weather[0].description}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
