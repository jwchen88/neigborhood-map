import React, { Component } from 'react';
import './App.css';
import MapContainer from './Component/MapContainer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="header">Lakewood Neigborhood Map</h1>
        </header>
        <div className="Map">
          <MapContainer

          />
        </div>
      </div>
    );
  }
}

export default App;
