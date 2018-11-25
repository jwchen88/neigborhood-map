import React, { Component } from "react";
import PropTypes from "prop-types";

export class Sidebar extends Component {
  static propTypes = {
    places: PropTypes.array.isRequired
  };

  state = {
    query: ""
  };

  updateQuery = newQuery => {
    this.setState({ query: newQuery });
    this.props.filterPlaces(newQuery)
  };

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-title">
          <h2 tabIndex="0">{this.props.title}</h2>
        </div>
        <div className="place-list">
          <div className="search">
            <input
              aria-label="search restaurants"
              className="search-restaurant"
              type="text"
              placeholder="Search"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
          <ul style={{listStyleType: "none"}}>
            {this.props.places && this.props.places.map((place, index)=> {
              return (
                <li key={place.id}>
                  <button
                    className="button"
                    key={index}
                    onClick={e => this.props.clickMarker(place.id)}>
                    <div className="place">
                      <h3 tabIndex="0">{place.name}</h3>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
