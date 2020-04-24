import React from "react";
import "./styles.scss";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CraterInfoDialogContent = props => (
  <form className="mx-3 mt-2">
    <div className="form-row align-items-center">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Name
          </span>
        </div>
        <input
          required
          type="text"
          className="form-control"
          placeholder="Some Name (Unique)"
          aria-label="Name"
          aria-describedby="basic-addon1"
        />
      </div>
    </div>
    <div className="form-row align-items-center mb-3">
      <div>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
          </div>
          <input
            type="text"
            className="form-control right-radius"
            id="inlineFormInput"
            placeholder="Optional"
          />
        </div>
      </div>

      <div>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text left-radius">@</div>
          </div>
          <input
            type="text"
            className="form-control"
            id="inlineFormInputGroup"
            placeholder="mail.com"
          />
        </div>
      </div>
    </div>
    <div className="form-group">
      <label
        style={{ paddingLeft: 0 }}
        className="col-md-2"
        htmlFor="exampleFormControlFile1"
      >
        Severity
      </label>
      <span className="col-md-6">
        <input
          className={props.rangeColor}
          type="range"
          id="rangeValue"
          min="0"
          max="10"
          onChange={props.onSliderChange}
        />
      </span>
      <label className="col-md-4">Selected Value: {props.selectedValue}</label>
    </div>
    <div className="form-group">
      <label htmlFor="exampleFormControlFile1">Any photo (s) to Upload</label>

      <input
        id="input-2"
        name="input2[]"
        type="file"
        className="form-control-file"
        multiple
        data-show-upload="true"
        data-show-caption="true"
        onChange={props.onFileSelectHandler}
      ></input>
    </div>
  </form>
);

export { CraterInfoDialogContent };
