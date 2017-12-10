import React, { Component } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Auth from '../../../utilities/AuthUtil';
import './_login.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      },
      redirectToReferrer: Auth.isUserAuthenticated()
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  onSubmit(event) {
    event.preventDefault();
    
    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // TODO: Update this to make a call to the server api and save the JWT token from that call
    // Save fake token for now...
    Auth.authenticateUser(formData);

    // Redirect to Home page
    this.props.history.push("/home");
  }

  render() {
    let { redirectToReferrer, errors, user } = this.state;
    if ( redirectToReferrer ) {
      return (
        <Redirect to = { '/home' } />
      )
    }

    return (
      <form name="loginForm" onSubmit={this.onSubmit} className="login">
        {errors.summary && <p className="error-message">{errors.summary}</p>}
  
        <div className="field-line">
          <TextField
            floatingLabelText="Email"
            name="email"
            errorText={errors.email}
            onChange={this.onChange}
            value={user.email}
          />
        </div>
  
        <div className="field-line">
          <TextField
            floatingLabelText="Password"
            type="password"
            name="password"
            onChange={this.onChange}
            errorText={errors.password}
            value={user.password}
          />
        </div>
  
        <div className="button-line">
          <RaisedButton type="submit" label="Log in" />
        </div>
  
        <CardText>Don't have an account? <Link to={'/registration'}>Create one</Link>.</CardText>
      </form>
    );
  }
}

export default withRouter(Login);