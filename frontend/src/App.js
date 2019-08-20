import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as loginAction from './actions/loginAction';
import store from './store';

class App extends Component {
  componentDidMount = async () => {
    try {
      window.addEventListener('load', () => {
        if (window.web3) {
          if (window.web3.currentProvider.isMetaMask) {
            store.dispatch(loginAction.web3Connect());
          }
        }
      });
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            {/* <Route exact path='/' component={HomePage} /> */}
            <Route exact path='/' component={LoginPage} />
            <Route exact path='/signup' component={SignUpPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    login: state.login
  };
};

export default compose(connect(mapStatetoProps))(App);
