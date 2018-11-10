import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react'

const mapStyles = {
  width:'100%',
  height:'80%'
}

export class MapContainer extends Component {
  render(){
    if (!this.props.loaded){
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 32.8138852,
            lng: -96.7683192
          }}
        />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAYV2FOC1UKAKyjIAibNXtcKLVb9Wo1VWU'
})(MapContainer)
