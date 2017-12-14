import React, { Component, PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { setContacts, setFilteredContacts } from '../../../utilities/Actions';
import { getContacts } from '../../../services/ContactService';

class RefreshButton extends Component {
	constructor(props){
		super(props)
		this.handleRefresh = this.handleRefresh.bind(this);
	}


	handleRefresh(){
		// call db for all contacts
		console.log('Refreshing contact list...');
		getContacts().then(results => {
			return results.json();
		}).then(
			data => {
				// reset the redux props
				this.props.setContacts(data);
				this.props.setFilteredContacts(data);
				console.log('Refresh complete.');
		});
	}

	render() {
		return (
			<RaisedButton label="Refresh" primary={true} className="flex-item"  onClick={this.handleRefresh}/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading,
		contacts: state.allContacts,
		filteredContacts: state.allFilteredContacts
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setContacts: (contacts) => dispatch(setContacts(contacts)),
		setFilteredContacts: (contacts) => dispatch(setFilteredContacts(contacts))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshButton);