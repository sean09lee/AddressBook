import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import { CardText } from 'material-ui/Card';
import './_noMatch.scss';

class NoMatch extends Component {

	render() {
		return (
			<div className="nomatch">
				<Divider inset={true} />
				<h2 className="card-heading">Oh no! Something went wrong!</h2>
				<CardText>Click <Link to={'/'}>here</Link> to navigate back to the home page</CardText>
			</div>
		)
	}
}

export default withRouter(NoMatch);
