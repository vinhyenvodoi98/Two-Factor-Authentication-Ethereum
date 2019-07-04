import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
// import HomePage from './components/HomePage';

class App extends Component {
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

export default App;
