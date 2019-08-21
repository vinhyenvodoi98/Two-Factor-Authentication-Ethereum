import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import '../style/login.css';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      etherAddress: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {}

  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    var etherAddress = await this.props.login.web3.eth.getAccounts();
    await this.setState({
      name: data.get('name'),
      username: data.get('username'),
      password: data.get('password'),
      etherAddress: etherAddress[0]
    });
    console.log(this.state.etherAddress);
    await axios
      .post('http://localhost:4000/signup', {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        etherAddress: this.state.etherAddress
      })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div className='login_container'>
        <div className='box'>
          <div className='choice_container'>
            <div className='c1'>
              <div className='c11' />

              <Route
                render={({ history }) => (
                  <div
                    id='left'
                    onClick={() => {
                      history.push('/');
                    }}
                  >
                    <h1 className='s1class'>
                      <span>SIGN</span>
                      <span className='su'>IN</span>
                    </h1>
                  </div>
                )}
              />
              <Route
                render={({ history }) => (
                  <div
                    id='right'
                    onClick={() => {
                      history.push('/signup');
                    }}
                  >
                    <h1 className='s2class text-color'>
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
              <div className='form_box'>
                <h1 className='space_around'>Sign Up</h1>
                <form className='form' onSubmit={this.handleSubmit}>
                  <label className='space_around' htmlFor='name'>
                    Enter Fullname
                  </label>
                  <input
                    className='input space_around'
                    id='name'
                    name='name'
                    type='text'
                    placeholder='Full name*'
                  />

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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    login: state.login
  };
};

export default compose(connect(mapStatetoProps))(SignUpPage);
