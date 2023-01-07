import React, { Component } from 'react';
import './style.css';

import RICIBs from 'react-individual-character-input-boxes';

export default class SearchBox extends Component {
  constructor() {
    super();

    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      count: 8,
    };
    console.log(this.state.count);
  }
  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }
  handleOutput(string) {
    console.log(string);
  }

  render() {
    return (
      <div>
        <RICIBs
          amount={parseInt(this.state.count)}
          handleOutputString={this.props.onSearch}
          // handleOutputString={this.handleOutput}
          inputRegExp={/^[A-Z0-9]$/}
        />
      </div>
    );
  }
}
