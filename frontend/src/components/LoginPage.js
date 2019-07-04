import React, { Component } from 'react';
import getWeb3 from '../Utilis/getWeb3';
import axios from 'axios';
import '../style/login.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: {},
      name: 'Hoang',
      username: '',
      password: '',
      accounts: '',
      login: false
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
      if (!this.state.login) {
        return (
          <div className='login_container'>
            <div className='form_box'>
              <h2 className='space_around'>Login</h2>
              <form className='form' onSubmit={this.handleSubmit}>
                <label className='space_around' htmlFor='username'>
                  Enter username
                </label>
                <input className='input space_around' id='username' name='username' type='text' />

                <label className='space_around' htmlFor='password'>
                  Enter your password
                </label>
                <input
                  className='input space_around'
                  id='password'
                  name='password'
                  type='password'
                />
                <button className='button '>Submit</button>
              </form>
            </div>
          </div>
        );
      } else {
        return <div className='background'>Hello ban :{this.state.name}</div>;
      }
    } else {
      return <div className='background' />;
    }
  }
}

export default LoginPage;
