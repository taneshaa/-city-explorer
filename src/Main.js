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
      searchquery: ''
    }
  }

  setCity = event => {
    this.setState({ searchquery: event.target.value })
    console.log(event);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.getLocationInfo();
  }

  getLocationInfo = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_APIKEY}&q=${this.state.searchquery}&format=json`
    try {
      let location = await axios.get(url);
      console.log(location);
      this.setState({
        cityName: location.data[0].display_name,
        latitude: location.data[0].lat,
        longitude: location.data[0].lon,
      })
    } catch (error) {

    }
  }



  // add functions then later add render
  render() {
    console.log(this.state.searchquery);
    return (
      <>
    <Form onSubmit = {this.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>City</Form.Label>
        <Form.Control type="City" placeholder="Enter city" onChange={this.setCity} />
        <Form.Text className="text-muted">

        </Form.Text>


      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">

      </Form.Group>
      <Button variant="primary" type="submit">
        Explore!
      </Button>
    </Form >
    <p>{this.state.cityName}</p>
    <p>{this.state.latitude}</p>
    <p>{this.state.longitude}</p>
    <Map url={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_APIKEY}&center=${this.state.latitude},${this.state.longitude}&size=${window.innerWidth}x300&format=jpg&zoom=12`}/>
    </>
    )
  }
}

export default Main