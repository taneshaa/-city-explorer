import React from "react";
import Axios from "axios";
import axios from "axios";

class Weather extends React.Component {
  weather = async (city) => {
    try {
      let weatherQuery = `${process.env.REACT_APP_SERVER}/weather?city=${city}`
      // telling server that im looking for this search string and it sends the search string to my server, goes to my /weather and feeds in city=city (city variable that was fed in from earlier)
      // axios data is city forecast in my server file (api)
      let axiosData = await axios.get(weatherQuery);
    }
  }
  render() {
    return (
      
    );
  }
}

// create variable, set state to axiosdata.data and use the information from weather stuff
// let dataOnPage = setState.axiosData.data