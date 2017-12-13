import React, { Component, PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { setContact, setContacts, setEditMode, setFilteredContacts } from '../../../utilities/Actions';
import TearSheet from '../TearSheet/TearSheet.jsx';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import DefaultAvatar from '../../../assets/default_avatar.jpg';
import SearchBar from '../SearchBar/SearchBar.jsx';

class ContactList extends Component {
	constructor(props){
		super(props)
		this.state = {
			requestFailed: false
		}

		this.deleteContact = this.deleteContact.bind(this);
	}

	deleteContact(contact){
		console.log('Deleting contact ' + contact.ContactFirstName + '...');
	}

	componentDidMount(){
		//initialize subscription here
		fetch('http://dev.addressbookservice.com/api/contacts')
			.then(results => {
				return results.json();
		}).then(data => {
			this.props.setContacts(data);
			this.setState({data: data});
		});
	};

	render() {
		var data = [];
		if (this.props.filteredContacts && this.props.filteredContacts.length > 0 ){
			data = this.props.filteredContacts;
		} else {
			data = this.props.contacts;
		}

		let contactMarkup = null;
		contactMarkup = data.map((contact) => {
			const rightButton = (
				<IconButton
					touch={true}
					tooltip="Delete"
					tooltipPosition="bottom-left"
					onClick={(contact) => this.deleteContact(contact)}
				>
					<Delete />
				</IconButton>
			);
			return( 
				<ListItem 
					key={contact.ContactId}
					primaryText={contact.ContactFirstName + " " + contact.ContactLastName}
					leftAvatar={<Avatar src={ DefaultAvatar } />}
					rightIconButton={rightButton}
					onClick={() => {
						this.props.setContact(contact);
						this.props.setEditMode(false);
					}}
				/>
			)
		})
		

		return (
			<TearSheet>
				<SearchBar
					onChange={() => console.log('onChange')}
					onRequestSearch={() => console.log('onRequestSearch')}
					style={{
						margin: '0 auto',
						maxWidth: 800
					}}
					/>
				<div className="flex-container">
					<RaisedButton label="Add" primary={true} className="flex-item"/>
					<RaisedButton label="Delete" primary={true} className="flex-item"/>
					<RaisedButton label="Select All" primary={true} className="flex-item"/>
				</div>
				<List>
					<Subheader>Contacts</Subheader>
					{contactMarkup}
				</List>
				<Divider />
				<List>
					<Subheader>Recently added</Subheader>
					<ListItem
					primaryText="Chelsea Otakan"
					leftAvatar={<Avatar src={DefaultAvatar} />}
					/>
					<ListItem
					primaryText="James Anderson"
					leftAvatar={<Avatar src={DefaultAvatar} />}
					/>
				</List>
			</TearSheet>
		);
	}
}

ContactList.propTypes = {
	setContact: PropTypes.func.isRequired,
	setContacts: PropTypes.func.isRequired,
	hasErrored: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	filteredContacts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		contact: state.selectedContact,
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading,
		contacts: state.allContacts,
		filteredContacts: state.allFilteredContacts,
		isEditMode: state.isEditMode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setContact: (contact) => dispatch(setContact(contact)),
		setContacts: (contacts) => dispatch(setContacts(contacts)),
		setFilteredContacts: (filteredContacts) => dispatch(setFilteredContacts(filteredContacts)),
		setEditMode: (bool) => dispatch(setEditMode(bool))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);