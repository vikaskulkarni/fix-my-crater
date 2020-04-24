import React, { Fragment } from "react";
import ReactS3Client from "../../s3Config";
import "./styles.scss";

export default class CraterInfoModal extends React.Component {
  
  onClose = e => {
    this.props.showModal(false);
  };

  onSubmit = () => {
    Array.from(this.props.selectedFiles).map(file => {
      ReactS3Client.uploadFile(file, file.name)
        .then(data => console.log(data))
        .catch(err => console.error(err));
    });
  };

  render() {
    if (!this.props.dialogParams.show) {
      return null;
    }
    const headerTitle = this.props.dialogParams.atCurrentLocation
      ? "At Current Location"
      : "At Marked Location (s)";
    return (
      <div className="cmodal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crater Details - {headerTitle}</h5>
          </div>
          <div className="modal-body">
            <div>{this.props.children}</div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-danger mb-2"
              onClick={e => {
                this.onClose(e);
              }}
            >
              Close
            </button>

            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={this.onSubmit.bind(this)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
