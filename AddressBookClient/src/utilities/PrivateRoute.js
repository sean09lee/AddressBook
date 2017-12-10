import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthUtil from './AuthUtil';

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		AuthUtil.isUserAuthenticated() ? (
			<Component {...props}/>
	  ) : (
			<Redirect to={{
				pathname: '/login',
				state: { from: props.location }
			}}/>
	  )
	)}/>
)