import React from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import MapComponent from "../../components/Map/MapComponent";
import { axiosGetData } from "../../utils/serverCalls";
import "./styles.scss";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null
    };
  }

  updateLocationWithMarkers(map, opts) {
    const results = [
      {
        name: "one",
        lat: 40.76239468343554,
        lng: -111.88481854072263
      },
      {
        name: "two",
        lat: 40.76221590513827,
        lng: -111.8832092153137
      },
      {
        name: "three",
        lat: 40.762020873720104,
        lng: -111.88194321265867
      }
    ];

    //this.setState({ places: results });
    axiosGetData(`${__API_URL__}/craters`).then(res => {
      const places = res.data;
      this.setState({ places: results });
    });
  }

  onMarkerClick(item) {
    const { history } = this.props;
    history.push(`/detail/${item.id}`);
  }

  render() {
    let mapProps = {
      google: this.props.google,
      places: this.state.places,
      loaded: this.props.loaded,
      onMarkerClick: this.onMarkerClick.bind(this),
      updateLocationWithMarkers: this.updateLocationWithMarkers.bind(this)
    };

    return (
      <div>
        <div className="content">
          <div className="row h-100">
            <div className="col-md-4 pr-0 h-100 overflow-auto">
              <Sidebar
                title={"Marked Craters"}
                onListItemClick={this.onMarkerClick.bind(this)}
                places={this.state.places}
              />
            </div>

            <div className="col-md-8 pl-0">
              <MapComponent {...mapProps} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomeContainer);
