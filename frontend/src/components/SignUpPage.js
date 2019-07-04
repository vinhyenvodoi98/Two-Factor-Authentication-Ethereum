import React, { Component } from 'react';
import axios from 'axios';
import '../style/login.css';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      accounts: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {}

  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    await this.setState({
      name: data.get('name'),
      username: data.get('username'),
      password: data.get('password')
    });
    console.log(this.state);
    await axios
      .post('http://localhost:4000/signup', {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password
      })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div className='login_container'>
        <div className='form_box'>
          <h2 className='space_around'>Sign Up</h2>
          <form className='form' onSubmit={this.handleSubmit}>
            <label className='space_around' htmlFor='name'>
              Enter fullname
            </label>
            <input className='input space_around' id='name' name='name' type='text' />

            <label className='space_around' htmlFor='username'>
              Enter username
            </label>
            <input className='input space_around' id='username' name='username' type='text' />

            <label className='space_around' htmlFor='password'>
              Enter your password
            </label>
            <input className='input space_around' id='password' name='password' type='password' />
            <button className='button '>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
