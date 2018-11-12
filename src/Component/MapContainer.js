import React, { Component } from 'react'
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react'

const mapStyles = {
  width:'100%',
  height:'80%'
}

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onClose = props => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }

  render(){
    if (!this.props.loaded){
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div>
        <Map
          google = {this.props.google}
          style = {mapStyles}
          zoom = {14}
          initialCenter={{
            lat: 32.8138852,
            lng: -96.7683192
          }}
        />
        <Marker
          onClick = {this.onMarkerClick}
          name = {'Lakewood Shopping Center'}
        />
        <InfoWindow
          marker = {this.state.activeMarker}
          visible = {this.state.showingInfoWindow}
          onClose = {this.onClose}
        />

          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAYV2FOC1UKAKyjIAibNXtcKLVb9Wo1VWU'
})(MapContainer)
