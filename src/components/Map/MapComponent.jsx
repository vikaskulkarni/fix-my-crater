import React, { PropTypes as T } from "react";
import Map, { GoogleApiWrapper } from "google-maps-react";
import red_flag from "./danger.png";
import styles from "./styles.scss";

export class MapComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      map: {}
    };
  }

  renderChildren() {
    const { children } = this.props;

    if (React.Children.count(children) > 0) {
      return React.Children.map(children, c => {
        return React.cloneElement(c, this.props, {
          map: this.props.map,
          google: this.props.google
        });
      });
    } else {
      return this.renderMarkers();
    }
  }

  renderMarkers = () => {
    if (!this.props.places) {
      return null;
    }
    return this.props.places.map(place => {
      var myLatLng = new google.maps.LatLng(place.lat, place.lng);
      this.placeMarker(this.state.map, { location: myLatLng, id: place.name });
    });
  };

  addInfoWindow(marker, message, map, uniqueId) {
    let infoWindowCtxt = this;
    let infoWindow = new google.maps.InfoWindow({
      content: message
    });

    google.maps.event.addListener(marker, "click", function() {
      infoWindowCtxt.props.onMarkerClick(marker);
      infoWindow.open(map, marker);
    });

    google.maps.event.addListener(infoWindow, "domready", () => {
      document
        .getElementById(uniqueId)
        .addEventListener("click", this.deleteMarker.bind(this));
    });
  }

  deleteMarker = param => {
    console.log("Delete");
  };

  placeMarker = (map, place) => {
    let marker = new google.maps.Marker({
      position: place.location,
      map: map,
      icon: red_flag,
      id: place.id
    });

    let uniqueId = "delete-marker-" + place.location.lat();

    let contentString =
      '<button type="button" class="btn btn-danger" id="' +
      uniqueId +
      '">Delete</button>';

    this.addInfoWindow(marker, contentString, map, uniqueId);
  };

  onReady(mapProps, map) {
    this.setState({ map });
    const { google } = this.props;
    let readyCtxt = this;

    google.maps.event.addListener(map, "click", function(event) {
      readyCtxt.placeMarker(map, { location: event.latLng, id: "asdasd" });
    });

    let infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          let currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(currentPosition);
          infoWindow.setContent("You are Here");
          infoWindow.open(map);
          map.setCenter(currentPosition);

          const opts = {};
          this.props.updateLocationWithMarkers(map, opts);
        },
        function() {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  render() {
    return (
      <div>
        {/* <button
          type="button"
          class="btn btn-danger"
          onClick={() => this.deleteMarker("param")}
        >
          Delete
        </button> */}
        <Map
          google={this.props.google}
          className="map"
          onReady={this.onReady.bind(this)}
          zoom={16}
        >
          {this.renderChildren()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(MapComponent);
