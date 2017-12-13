import React, { Component } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Auth from '../../../utilities/AuthUtil';
import { getUser } from '../../../services/UserService';
import './_login.scss';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {},
			user: {
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
		
		// TODO: Update this to save the JWT token
		getUser(this.state.user).then(data => {
			if (data.ok){
				Auth.authenticateUser();

				// Redirect to Home page
				this.props.history.push("/home");
			}
			else {
				Auth.deauthenticateUser();
				this.setState({
					errors : {
						summary: 'Login failed. Please enter a valid email and password.'
					}
				});
			}
		}).catch(() => {
			Auth.deauthenticateUser();
			this.setState({
				errors : {
					summary: 'Login failed. This may be due to a bad internet connection. Please try again.'
				}
			});
		})
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
					<RaisedButton type="submit" label="Log in" />
				</div>
	
				<CardText>Don't have an account? <Link to={'/registration'}>Create one</Link>.</CardText>
			</form>
		);
	}
}

export default withRouter(Login);