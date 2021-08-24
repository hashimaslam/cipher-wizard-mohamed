import React, { Component } from "react";
import { rot13, rotN, base64 } from "./Ciphers";
import SelectBox from "./components/SelectBox";
import Input from "./components/Input";
import TextArea from "./components/TextArea";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { TiDeleteOutline } from "react-icons/ti";
import debounce from "lodash.debounce";
/* eslint-disable import/no-webpack-loader-syntax */
import Worker from "./app.worker";
// const ciphers = { rot13, rotN, base64 };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCiper: "rot13",
      originalText: "",
      encodedText: "",
      shift: 13,
      loading: false,
    };
    this.debouncedExecute = debounce(this.exectueEncoding.bind(this), 300);
  }
  componentDidMount = () => {
    this.worker = new Worker();
  };
  componentWillUnmount() {
    this.worker.terminate();
  }

  /* 
@type function
state setter for input changes
*/
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  exectueEncoding() {
    const { selectedCiper, shift, originalText } = this.state;
    //Sending data to worker
    this.worker.postMessage({
      text: originalText,
      shift,
      selected: selectedCiper,
    });
    this.worker.onmessage = (event) => {
      this.setState({ ...this.state, encodedText: event.data, loading: false });
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.originalText !== this.state.originalText ||
      prevState.shift !== this.state.shift
    ) {
      if (this.state.originalText !== "") {
        this.setState({ ...this.state, loading: true });
        this.debouncedExecute();
      }
    }
    if (prevState.selectedCiper !== this.state.selectedCiper) {
      this.exectueEncoding();
    }
  }

  handleSwitch = () => {
    this.setState({ ...this.state, originalText: this.state.encodedText });
  };
  handleClear = () => {
    this.setState({
      ...this.state,
      encodedText: "",
      originalText: "",
    });
  };
  render() {
    // TODO: I've implemented two ciphers, but this web app
    // doesn't seem to do anything. Please help...
    const {
      selectedCiper,
      originalText,
      encodedText,
      shift,
      loading,
    } = this.state;
    return (
      <div className="container">
        <div className="wrapper">
          <h1 className="title">Cipher Wizard</h1>
          <div className="flex">
            <SelectBox
              selectedCiper={selectedCiper}
              handleChange={this.handleChange}
            />
          </div>

          {selectedCiper === "rotN" && (
            <>
              <br />
              <label className="inputLabel">
                {"Shift: "}
                <Input
                  handleChange={this.handleChange}
                  shift={shift}
                  className="input"
                />
              </label>
              <br />
            </>
          )}

          <br />
          <div className="clearBtn" onClick={this.handleClear}>
            <div> Clear</div> <TiDeleteOutline className="clearIcon" />
          </div>

          <div className="flex">
            <TextArea
              name="originalText"
              value={originalText}
              onChange={this.handleChange}
              className="textArea"
              placeholder="Enter Text"
            />
            <div className="iconsWrapper">
              <HiOutlineSwitchHorizontal
                className="icon"
                onClick={this.handleSwitch}
              />
            </div>
            <TextArea
              value={loading ? "...Encrypting" : encodedText}
              readOnly={true}
              className="textArea readOnly"
              placeholder={"Encrypted Text"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
