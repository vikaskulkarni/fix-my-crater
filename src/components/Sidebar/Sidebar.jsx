import React from "react";
import PropTypes from "prop-types";
import Listing from "../Listing/Listing";
import "./styles.scss";

export class Sidebar extends React.Component {
  onClick(place, map, google) {
    if (this.props.onListItemClick) {
      place.place = place;
      this.props.onListItemClick(place, map, google);
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#f2f3f4",
          borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0"
        }}
        className="min-vh-100"
      >
        <div className="card-header">
          <div>{this.props.title}</div>
        </div>
        <div className="card-body">
          <Listing
            places={this.props.places}
            onClick={this.onClick.bind(this)}
          />
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  places: PropTypes.array,
  title: PropTypes.string,
  onListItemClick: PropTypes.func
};

Sidebar.defaultProps = {
  title: "C"
};

export default Sidebar;
