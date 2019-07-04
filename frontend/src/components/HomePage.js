import React, { Component } from 'react';

import '../App.css';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }

  async componentWillMount() {}

  render() {
    if (this.state.web3.eth !== undefined) {
      return <div className='container' />;
    } else {
      return <div />;
    }
  }
}

export default Homepage;
