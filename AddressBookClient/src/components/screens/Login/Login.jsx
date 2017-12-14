import React, { Component } from 'react';
import { dispatch, connect } from 'react-redux';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Auth from '../../../utilities/AuthUtil';
import { setUser } from '../../../utilities/Actions';
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
		getUser(this.state.user).then(results => {
			if (results.ok){
				return results.json();
			}
			else {
				Auth.deauthenticateUser();
				this.setState({
					errors : {
						summary: 'Login failed. Please enter a valid email and password.'
					}
				});
				return;
			}
		}).then(data => {
			// Set token and redux prop
			Auth.authenticateUser(data.UsersId);
			this.props.setUser(data);

			// Redirect to Home page
			this.props.history.push("/home");
		}).catch(() => {
			Auth.deauthenticateUser(this.props.user.UsersId);
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));