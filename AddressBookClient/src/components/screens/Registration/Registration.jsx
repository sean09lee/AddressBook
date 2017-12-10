import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Auth from '../../../utilities/AuthUtil';
import './_registration.scss';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
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
    const email = encodeURIComponent(this.state.email);
    const password = encodeURIComponent(this.state.password);
    const formData = `email=${email}&password=${password}`;

    // TODO: Update this to make a call to the server api and save the JWT token from that call
    // Save fake token for now...
    Auth.authenticateUser(formData);

    // Redirect to Home page
    this.props.history.push("/home");
  }

  render() {
    let { errors, user } = this.state;
    return (
      <form name="registrationForm" onSubmit={this.onSubmit} className="registration">
        <h2 className="card-heading">Registration</h2>

        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
          <TextField
            floatingLabelText="Name"
            name="name"
            errorText={errors.name}
            onChange={this.onChange}
            value={user.name}
          />
        </div>

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
          <RaisedButton type="submit" label="Create New Account" primary />
        </div>

        <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
      </form>
    );
  }
}

export default withRouter(Registration);