import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import Weather from "./Weather";
import Map from "./Map";


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityName: '',
      latitude: '',
      longitude: '',
      // starting data/info for getting all the other info from each location/city and their weather
      searchquery: '',
      // this is the object thats pulled from the weather api using our function getWeatherInfo
      forecast: {},
      errorMessage: false
    }
  }

  
  setCity = event => {
    // saving the name thats been typed in
    this.setState({ searchquery: event.target.value })
  }


  handleSubmit = event => {
    // this makes it so my page doesnt reload before im able to use my data
    event.preventDefault();
    // getting the maps, lat and lon
    this.getLocationInfo();
    // getting weather information
    this.getWeatherInfo();
  }

  getLocationInfo = async (event) => {
   
    try {
      // calling a variable named url and its going to this exact url to make the call. When you search API by url everything thats here will use the url for that specific data
      // template literal `` in a variable allows us to use varible in a string
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_APIKEY}&q=${this.state.searchquery}&format=json`
      // location is a variable of whatever data was requestion by axios.get(url)
      let location = await axios.get(url);
  
      this.setState({
        cityName: location.data[0].display_name,
        latitude: location.data[0].lat,
        longitude: location.data[0].lon,
      })
    } catch (error) {
      console.log(error);

    }
  }


  getWeatherInfo = async () => {
    // weather?city_name, weahter = "/weather", city_name = whatever the request.query is (look in server for clues)
    const url = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.searchquery}`;
    // using link with axios to send search query to the server, weatherInfo is the data you're gonna get back from the server
    let weatherInfo = await axios.get(url);
    this.setState({
      forecast: weatherInfo.data,
    });

  }



  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city" onChange={this.setCity} />
            <Form.Text className="text-muted">

            </Form.Text>


          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">

          </Form.Group>
          {/* when you hit the button on the react page, it runs all the above code to give you the city information like name, location, lat, long, weather,movies */}
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form >
        {this.state.errorMessage ?
          <p>{this.state.errorMessage}</p>
          :
          <div>
            <p>{this.state.cityName}</p>
            <p>{this.state.latitude}</p>
            <p>{this.state.longitude}</p>
            <Map url={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_APIKEY}&center=${this.state.latitude},${this.state.longitude}&size=${window.innerWidth}x300&format=jpg&zoom=12`} />
          </div>
        }
        <div>
          <p>{this.state.dateOne}</p>
          <p>{this.state.forecastOne}</p>
        </div>

        <Weather
          forecast={this.state.forecast}
        ></Weather>
      </>
    )
  }

}

export default Main;

