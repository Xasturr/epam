import React, { Component } from 'react';
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';
import config from '../config/config';

const myApiKey = config.apiKey;

class GoogleMap extends Component {

  render() {
    const mapStyles = {
      width: '100%',
      height: '100%',
      position: 'relative'
    };

    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        
        initialCenter={{ lat: 50.4478303, lng: 30.4564608 }}
      >
        <Marker position={{ lat: 50.4478303, lng: 30.4564608 }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: myApiKey
})(GoogleMap);