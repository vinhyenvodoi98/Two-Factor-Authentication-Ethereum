import React, { Component } from 'react';
import getWeb3 from '../Utilis/getWeb3';
import axios from 'axios';
import '../App.css';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: {},
      username: '',
      password: '',
      accounts: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    this.setState({ web3: await getWeb3() });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    await this.setState({
      username: data.get('username'),
      password: data.get('password'),
      accounts: await this.state.web3.eth.getAccounts()
    });
    console.log(this.state);
    await axios
      .post('http://localhost:4000', {
        username: this.state.username,
        password: this.state.password,
        accounts: this.state.accounts
      })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    if (this.state.web3.eth !== undefined) {
      return (
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='username'>Enter username</label>
            <input id='username' name='username' type='text' />

            <label htmlFor='password'>Enter your password</label>
            <input id='password' name='password' type='password' />

            <button>Send data!</button>
          </form>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Homepage;
