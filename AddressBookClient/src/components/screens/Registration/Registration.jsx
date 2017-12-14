import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Auth from '../../../utilities/AuthUtil';
import './_registration.scss';
import { saveUser } from '../../../services/UserService';

class Registration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
			user: {
				UsersFirstName: '',
				UsersLastName: '',
				UsersEmail: '',
				UsersPassword: ''
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
		const email = encodeURIComponent(this.state.user.UsersEmail);
		const password = encodeURIComponent(this.state.user.UsersPassword);
		const formData = `email=${email}&password=${password}`;

		// TODO: Update this to make a call to the server api and save the JWT token from that call
		saveUser(this.state.user).then(data => {
			if (data.ok){
				Auth.authenticateUser(formData);
			} else {
				Auth.deauthenticateUser();
				this.setState({
					errors : {
						summary: 'Registration failed. Please enter a valid email.',
						email: 'A user already has this email. Please use a different one.'
					}
				});
			}
		}).catch((error) => {
			console.log(error);
		});

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
						floatingLabelText="First Name (optional)"
						name="UsersFirstName"
						errorText={errors.name}
						onChange={this.onChange}
						value={user.UsersLastName}
					/>
				</div>

				<div className="field-line">
					<TextField
						floatingLabelText="Last Name (optional)"
						name="UsersLastName"
						onChange={this.onChange}
						value={user.UsersLastName}
					/>
				</div>

				<div className="field-line">
					<TextField
						floatingLabelText="Email"
						type="email"
						name="UsersEmail"
						errorText={errors.email}
						onChange={this.onChange}
						value={user.UsersEmail}
					/>
				</div>

				<div className="field-line">
					<TextField
						floatingLabelText="Password"
						type="password"
						name="UsersPassword"
						onChange={this.onChange}
						errorText={errors.password}
						value={user.UsersPassword}
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