import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
//import { searchNearby } from "../utils/GoogleApi";
import MapError from "./MapError"

export class MapContainer extends Component {
  state = {
    map: null,
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false,
    firstDrop: true,
    introAnim: this.props.google.maps.Animation.BOUNCE,
    placeCount: 0
  }

  componentDidMount = () => {}

  mapReady = (props, map) => {
    this.setState({map});
  }

  saveRealMarker = marker => {
    this.props.saveRealMarker(marker)
  }

  componentWillReceiveProps = (props) => {
        const placeCountChanged = this.state.placeCount !== props.places.length
            ? true
            : false;
        const introAnim = !this.state.firstDrop
            ? null
            : this.props.google.maps.Animation.DROP;
        const showingInfoWindow = props.activeMarker && !placeCountChanged
            ? true
            : false;

        this.setState({firstDrop: false, introAnim, activeMarker: props.activeMarker, showingInfoWindow, placeCount: props.places.length},
            () => {
                if (this.state.activeMarker) this.state.activeMarker.marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
            });

    }

  closeInfoWindow = () => {
    this.setState({
      showingInfoWindow: false
    })
  }

  onMarkerClick = marker => {
    this.props.clickMarker(marker.id)
  }


  render() {
    return (
      <div className="map">
        <Map
          role="application"
          aria-label="map"
          style={{ height: "100%", width: "75vw", position: "absolute" }}
          //onReady={this.onReady.bind(this)}
          onReady={this.mapReady}
          onClick={this.closeInfoWindow}
          google={this.props.google}
          initialCenter={{
              lat: 32.8124432,
              lng: -96.7514695
          }}
          zoom={16}>
          {this.props.places && this.props.places.map((place, index) => {
            return (
              <Marker
                id={place.id}
                key={place.id}
                ref={this.saveRealMarker}
                index={index}
                onClick={this.onMarkerClick}
                title={place.name}
                name={place.name}
                place={place}
                //rating={place.rating}
                address={place.location.formattedAddress}
                animation={this.state.introAnim}
                position={{
                    lat: place.location.lat,
                    lng: place.location.lng
                }}
              />
            );
          })}
          <InfoWindow
            marker={this.state.activeMarker && this.state.activeMarker.marker}
            visible={this.state.showingInfoWindow}
            onClose={this.closeInfoWindow}>
            <div>
              <h4>{this.state.activeMarker && this.state.activeMarker.props.name}</h4>
              <p>Address: {this.state.activeMarker && this.state.activeMarker.props.address}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAYV2FOC1UKAKyjIAibNXtcKLVb9Wo1VWU",
  LoadingContainer: MapError
})(MapContainer);
