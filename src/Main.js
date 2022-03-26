import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import Map from "./Map";


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityName: '',
      latitude: '',
      longitude: '',
      searchquery: '',
      dateOne: '',
      dateTwo: '',
      dateThree: '',
      forecastOne: '',
      forecastTwo: '',
      forecastThree: '',
      errorMessage: false
    }
  }

  setCity = event => {
    // saving the name thats been typed in
    this.setState({ searchquery: event.target.value })
    // console.log(event);
  }

  handleSubmit = event => {
    // this makes it so my page doesnt reload before im able to use my data
    event.preventDefault();
    // 
    this.getLocationInfo();
  }

  getLocationInfo = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_APIKEY}&q=${this.state.searchquery}&format=json`
    try {
      let location = await axios.get(url);
      // console.log(location);
      this.setState({
        cityName: location.data[0].display_name,
        latitude: location.data[0].lat,
        longitude: location.data[0].lon,
      })
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.response.data.error });

    }
    this.getWeatherInfo();
  }


  getWeatherInfo = async () => {
    const url = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.searchquery}`;
    console.log(url);
    let weatherInfo = await axios.get(url);
    console.log(weatherInfo);
    this.setState({
      dateOne: weatherInfo.data.dateOne,
      dateTwo: weatherInfo.data.dateTwo,
      dateThree: weatherInfo.data.dateThree,
      forecastOne: weatherInfo.data.forecastOne,
      forecastTwo: weatherInfo.data.forecastTwo,
      forecastThree: weatherInfo.data.forecastThree,
    });

  }


  // add functions then later add render
  render() {
    // console.log(this.state.searchquery);
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
          <p>{this.state.dateTwo}</p>
          <p>{this.state.forecastTwo}</p>
          <p>{this.state.dateThree}</p>
          <p>{this.state.forecastThree}</p>
        </div>
      </>
    )
  }

}

export default Main;

