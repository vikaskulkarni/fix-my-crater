import React, { PropTypes, Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles.scss";
import HomeContainer from "./views/main/HomeContainer";
import Detail from "./views/main/DetailWithPhotos";
import AsyncHomeContainer from "./views/main/AsyncHomeContainer";
import Header from "./components/Header/Header";
import CraterModal from "./components/modal/craterInfoModal";
import { CraterInfoDialogContent } from "./components/functional/functionalComponents";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 10,
      rangeColor: "rangeCls-5",
      selectedFiles: [],
      dialogParams: {
        show: false,
        atCurrentLocation: true
      }
    };
  }

  showModal = (value, atCurrentLocation) => {
    this.setState({
      dialogParams: {
        show: value,
        atCurrentLocation
      }
    });
  };

  onSliderChange = event => {
    this.setState({
      selectedValue: event.currentTarget.value,
      rangeColor: `rangeCls-${Math.floor(event.currentTarget.value / 2)}`
    });
  };

  validateUniqueName = value => {
    fetch(`${serverUrl}/users`, { method: "GET" })
      .then(response => response.json())
      .then(data => {
        this.setState({
          places: results
        });
      })
      .catch(e => {
        console.log(e);
        return e;
      });
  };

  componentDidMount() {}

  onFileSelectHandler = event => {
    console.log(event.target.files[0]);
    this.setState({ selectedFiles: event.target.files });

    // event.target.files.map(file => {
    //   ReactS3Client.uploadFile(file, file.name)
    //     .then(data => console.log(data))
    //     .catch(err => console.error(err));
    // });
  };

  render() {
    return (
      <Fragment>
        <Header showModal={this.showModal} />
        <CraterModal
          dialogParams={this.state.dialogParams}
          showModal={this.showModal}
          selectedFiles={this.state.selectedFiles}
        >
          <CraterInfoDialogContent
            onSliderChange={this.onSliderChange}
            selectedValue={this.state.selectedValue}
            rangeColor={this.state.rangeColor}
            onFileSelectHandler={this.onFileSelectHandler}
          />
        </CraterModal>

        <div className="">
          <Router>
            <AsyncHomeContainer />
            {/* <HomeContainer /> */}
            <Route path="/detail/:placeId" component={Detail} />
          </Router>
        </div>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app-root"));
