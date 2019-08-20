import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import store from 'store';
import axios from 'axios';
import '../style/login.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // web3: {},
      name: '',
      username: '',
      password: '',
      accounts: '',
      contractAddress: '',
      haveContratAddress: false,
      login: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async componentWillMount() {
  //   this.setState({ web3: await getWeb3() });
  // }

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
      .post('http://localhost:4000/login', {
        username: this.state.username,
        password: this.state.password,
        accounts: this.state.accounts
      })
      .then((res) => {
        this.setState({ contractAdress: res.data.contractAdress, haveContratAddress: true });
        // console.log(res);
      });
  }

  render() {
    // console.log(this.props.login);
    if (this.props.login.web3 !== undefined) {
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

                {this.state.havecontractAddress ? <div /> : <div>{this.state.contractAdress}</div>}

                <div>
                  <button className='button'>Submit</button>
                  <Route
                    render={({ history }) => (
                      <button
                        className='button'
                        onClick={() => {
                          history.push('/signup');
                        }}
                      >
                        SignUp
                      </button>
                    )}
                  />
                </div>
              </form>
            </div>
          </div>
        );
      } else {
        return <div className=''>Hello ban :{this.state.name}</div>;
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
