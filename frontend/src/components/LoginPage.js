import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import store from '../store';
import * as loginAction from '../actions/loginAction';
import axios from 'axios';
import '../style/login.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      accounts: '',
      contractAddress: '',
      havecontractAddress: false,
      verified: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyContract = this.verifyContract.bind(this);
  }

  async verifyContract() {
    store.dispatch(loginAction.instantiateContracts(this.state.contractAddress));
    // khoi tao roi xac thuc
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    await this.setState({
      username: data.get('username'),
      password: data.get('password'),
      etherAddress: await this.props.login.web3.eth.getAccounts()
    });
    await axios
      .post('http://localhost:4000/login', {
        username: this.state.username,
        password: this.state.password,
        etherAddress: this.state.etherAddress
      })
      .then((res) => {
        console.log(res);
        this.setState({ contractAddress: res.data.contractAddress, havecontractAddress: true });
        // console.log(res);
      });
  }

  render() {
    if (this.props.login.web3) {
      if (!this.props.login.data.verified) {
        return (
          <div className='login_container'>
            <div className='box'>
              <div className='choice_container'>
                <div className='c1'>
                  <div className='c11' />
                  <div id='left'>
                    <h1 className='s1class text-color'>
                      {this.homepageRender}
                      <span>SIGN</span>
                      <span className='su'>IN</span>
                    </h1>
                  </div>
                  <Route
                    render={({ history }) => (
                      <div
                        id='right'
                        onClick={() => {
                          history.push('/signup');
                        }}
                      >
                        <h1 className='s2class'>
                          <span>SIGN</span>
                          <span className='su'>UP</span>
                        </h1>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className='box'>
              <div className='choice_container'>
                <div className='c2'>
                  <h1 className='space_around'>Login</h1>

                  {this.state.havecontractAddress ? (
                    <div className='verify-box'>
                      <div className='address-font'>
                        <p>{this.state.contractAddress}</p>
                      </div>
                      <button className='button' onClick={this.verifyContract}>
                        Verify
                      </button>
                    </div>
                  ) : (
                    <form className='form' onSubmit={this.handleSubmit}>
                      <label className='space_around' htmlFor='username'>
                        Enter username
                      </label>
                      <input
                        className='input space_around'
                        id='username'
                        name='username'
                        type='text'
                        placeholder='Username*'
                      />

                      <label className='space_around' htmlFor='password'>
                        Enter your password
                      </label>
                      <input
                        className='input space_around'
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Password*'
                      />
                      <button className='button'>Submit</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className='login_container'>
            <div className='japanese-font'>
              <p>こんにちは</p>
              <p>{this.props.login.data.name}-さん</p>
            </div>
          </div>
        );
      }
    } else {
      return <div className='' />;
    }
  }
}

const mapStatetoProps = (state) => {
  return {
    login: state.login
  };
};

export default compose(connect(mapStatetoProps))(LoginPage);
