import React, { PropTypes as T } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import { getDetailsWithoutMap } from "../../utils/googleApiHelpers";
import styles from "./styles.scss";

export class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      place: {},
      location: {}
    };
  }

  componentDidMount() {
    // const { placeId } = this.props.match.params;

    // if (placeId) {
    //   this.getPlaceDetails(placeId);
    // }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.placeId !== this.props.match.params.placeId) {
      this.getPlaceDetails(this.props.match.params.placeId);
    }
  }

  getPlaceDetails(placeId) {
    const { google } = this.props;

    getDetailsWithoutMap(google, placeId).then(place => {
      const { location } = place.geometry;
      const loc = {
        lat: location.lat(),
        lng: location.lng()
      };

      this.setState({
        place,
        location: loc,
        loading: false
      });
    });
  }

  renderPhotos(place) {
    if (!place.photos || place.photos.length == 0) return;
    const cfg = { maxWidth: 100, maxHeight: 100 };
    return (
      <div className="photoStrip">
        {place.photos.map(p => {
          const url = `${p.getUrl(cfg)}.png`;
          return <img key={url} src={url} />;
        })}
      </div>
    );
  }

  render() {
    // if (this.state.loading) {
    //   return <div className="row">Loading...</div>;
    // }
    const { place } = this.state;
    return (
      <div className="row">
        <div>hello</div>
        {/* <div className="details">{this.renderPhotos(place)}</div> */}

      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Detail);
//export default Detail;
