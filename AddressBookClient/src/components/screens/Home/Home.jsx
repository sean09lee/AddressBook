import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import ContactList from '../../containers/ContactList/ContactList.jsx';
import ContactCard from '../../containers/ContactCard/ContactCard.jsx';
import HeaderBar from '../../containers/HeaderBar/HeaderBar.jsx';
import Loading from '../../buttons/Loading/Loading.jsx';
import './_home.scss';
import { Card } from 'material-ui/Card/Card';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: [],
			isLoading: this.props.isLoading
		}
	}

	componentWillReceiveProps(newProps) {
		this.setState({contact: newProps.contact});
	}

	render() {
		return (
			<div className="home">
				<div className="flex-container">
					<HeaderBar className="item" history={this.props.history} />
				</div>
				<div className="flex-container">
					<ContactList className="item" />
					{(function(isLoading, contact) {
						if (isLoading) {
							return (<Loading />);
						}
						return (<ContactCard className="item" contact={contact}/>);
					})(this.state.isLoading, this.state.contact)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
			isLoading: state.itemsIsLoading
	};
};

export default connect(mapStateToProps)(Home);