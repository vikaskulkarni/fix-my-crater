import React, { PropTypes as T } from "react";
import classnames from "classnames";

import Rating from "../Rating/Rating";
import "./styles.scss";

export class Item extends React.Component {
  render() {
    const { place } = this.props;
    return (
      <div className="item">
        <div className={classnames("title")}>{place.name}</div>
        {/* <Rating className="rating" percentage={place.rating / 5} /> */}
      </div>
    );
  }
}

export default Item;
