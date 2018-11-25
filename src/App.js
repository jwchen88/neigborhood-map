import React, { Component } from "react";
import "./App.css";
import MapContainer from "./component/MapContainer.js";
import Sidebar from "./component/Sidebar.js"

const FS_CLIENT = "HHUV2BREYTPF4NC4ANOYCCROTNLB4FQATM4TVC4ULI4DUA0T";
const FS_SECRET = "B3Y3MCPEXNGDF5U03GJON1J10JIZIQIO05WAYQFO1GLPJUH0";
const FS_VERSION = "20181111";

class App extends Component {
  state = {
    places: [],
    //pagination: null,
    activeMarker: null,
    selectedId: null,
    filtered: null
  };

  realMarkers = [];

  /*
  onReady(mapProps, map) {
    const { google } = this.props;
    const opts = {
      location: { lat: 32.8124432, lng: -96.7514695 },
      radius: "500",
      type: ["restaurant"]
    };
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        this.setState({
          places: results,
          pagination,
          map
        });
      })
      .catch((status, result) => {});
  }
  */

  //get data from four square
  componentDidMount = () => {
    let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}&radius=500&ll=32.8132922, -96.7521698&intent=browse&categoryId=4d4b7105d754a06374d81259&limit=20`;
    let headers = new Headers();
    let request = new Request(url, {
      method: 'GET',
      headers
    });
    fetch(request)
      .then(response => response.json())
      .then(json => {
        const places = json.response.venues;
        this.setState({
          places,
          filtered: this.filterPlaces(places, "")
        });
      })
      .catch(error => {
        alert("FourSquare data could not be retrieved" + error);
      });
  };

  saveRealMarker = marker => {
    if (this.realMarkers.indexOf(marker) === -1 && marker !== null)
    this.realMarkers.push(marker);
  }

  //Click on a Marker
  clickMarker = (id) => {
    const marker = this.realMarkers.filter(marker => marker.marker.id === id)[0];
    this.setState({
      selectedId: id,
      activeMarker: marker
    })
  };

  updateQuery = query => {
    //Update the query value and filter and list of locations accordingly
    this.setState({
      selectedIndex: null,
      filtered: this.filterPlaces(this.state.places, query)
    });
  };

  filterPlaces = (places, query) => {
    return places.filter(place => place.name.toLowerCase().includes(query.toLowerCase()));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" role="banner">
          <h1 tabIndex="0">Lakewood Neighboorhood Map</h1>
        </header>
        <Sidebar
          title={"Restaurants"}
          places={this.state.filtered}
          filterPlaces={this.updateQuery}
          clickMarker={this.clickMarker}
        />
        <MapContainer
          places={this.state.filtered}
          saveRealMarker={this.saveRealMarker}
          clickMarker={this.clickMarker}
          activeMarker={this.state.activeMarker}
        />
      </div>
    );
  }
}

export default App;
