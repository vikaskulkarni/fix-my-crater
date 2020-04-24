import React from "react";
import "./styles.scss";

class Header extends React.Component {
  render() {
    return (
      <div className="py-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
          <a className="navbar-brand" href="/">
            Fix My crater
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active m-2">
                <button
                  className="nav-link btn btn-outline-primary btn-sm"
                  onClick={e => {
                    this.props.showModal(true, true);
                  }}
                >
                  Report a Crater at Current Location
                  <span className="sr-only">(current)</span>
                </button>
              </li>

              <li className="nav-item active m-2">
                <button
                  className="nav-link btn btn-outline-primary btn-sm"
                  onClick={e => {
                    this.props.showModal(true, false);
                  }}
                >
                  Report Crater (s) at Marked Location (s){" "}
                  <span className="sr-only">(current)</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
