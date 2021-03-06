import React, { Component } from 'react';
import { dispatch, connect } from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Auth from '../../../utilities/AuthUtil';
import { setUser } from '../../../utilities/Actions';
import { saveUser } from '../../../services/UserService';
import './_registration.scss';

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
		const email = encodeURIComponent(this.state.user.UsersEmail);
		const password = encodeURIComponent(this.state.user.UsersPassword);
		const formData = `email=${email}&password=${password}`;

		// TODO: Update this to make a call to the server api and save the JWT token from that call
		saveUser(this.state.user).then((results) => {
			if (results.ok){
				return results.json();
			}else {
				this.setState({
					errors : {
						summary: 'Registration failed. Please enter a valid email.',
						email: 'A user already has this email. Please use a different one.'
					}
				});
			}
		}).then(data => {
			// store token locally
			Auth.authenticateUser(data.UsersId);
			
			// Redirect to Home page
			this.props.history.push("/home");
		}).catch((error) => {
			console.log(error);
		});
	}

	render() {
		let { redirectToReferrer, errors, user } = this.state;
		if ( redirectToReferrer ) {
			return (
				<Redirect to = { '/home' } />
			)
		}

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

const mapStateToProps = (state) => {
	return {
			isLoading: state.itemsIsLoading,
			user: state.selectedUser
	};
};


const mapDispatchToProps = (dispatch) => {
	return {
		setUser: (user) => dispatch(setUser(user))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registration));