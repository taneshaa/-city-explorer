import React from "react";
import { Image } from "react-bootstrap";


class Map extends React.Component {
  render() {
    return (
      <Image src={this.props.url} alt={this.props.name} title={this.props.name} />

    )
  }
}

export default Map;