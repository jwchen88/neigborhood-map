import React, { Component } from 'react'
import {GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react'
import CurrentLocation from './Map.js'
import axios from 'axios'

export class MapContainer extends Component {
  state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      venues: []
    }

  componentDidMount(){
    this.getVenues()
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

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "HHUV2BREYTPF4NC4ANOYCCROTNLB4FQATM4TVC4ULI4DUA0T",
      client_secret: "B3Y3MCPEXNGDF5U03GJON1J10JIZIQIO05WAYQFO1GLPJUH0",
      section: "food",
      ll: "32.8132922, -96.7521698",
      v: "20181111"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.loadMap())
    })
    .catch(error => {
      console.log("Error!" + error)
    })
  }

  render(){
    return (
      <div>
        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          <Marker
            onClick = {this.onMarkerClick}
            name = {'Lakewood Shopping Center'}
          />
          <InfoWindow
            marker = {this.state.activeMarker}
            visible = {this.state.showingInfoWindow}
            onClose = {this.onClose}>
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </CurrentLocation>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAYV2FOC1UKAKyjIAibNXtcKLVb9Wo1VWU'
})(MapContainer)
