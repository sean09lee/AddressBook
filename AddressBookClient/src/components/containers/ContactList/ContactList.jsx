import React, { Component, PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { setContact, setContacts, setFilteredContacts, setEditMode } from '../../../utilities/Actions';
import { getContacts, deleteContact } from '../../../services/ContactService';
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
import TearSheet from '../TearSheet/TearSheet.jsx';
import AddContact from '../../buttons/AddContact/AddContact.jsx';
import RefreshButton from '../../buttons/RefreshButton/RefreshButton.jsx';

class ContactList extends Component {
	constructor(props){
		super(props)
		this.state = {
			requestFailed: false
		}

		this.deleteContact = this.deleteContact.bind(this);
		this.removeFromContacts = this.removeFromContacts.bind(this);
	}

	deleteContact(contactId){
		console.log('Deleting contact ' + contactId + '...');
		deleteContact(contactId).then(() => {
			// remove from contacts
			var contacts = this.props.contacts;
			this.removeFromContacts(contacts, contactId);

			// remove from filtered contacts
			var filteredContacts = this.props.filteredContacts;
			if (contacts.length != filteredContacts.length){
				this.removeFromContacts(filteredContacts, contactId);
			}

			// reset the redux props
			this.props.setContacts(contacts);
			this.props.setFilteredContacts(filteredContacts);

			console.log('contact deleted successfully');
			this.forceUpdate();
		}).catch(() => {
			console.log('contact failed to delete');
		});
	}

	removeFromContacts(contactsList, contactId){
		var index = contactsList.findIndex(function(obj) {
			return obj.ContactId === contactId;
		});
		contactsList.splice(index, 1);
	}

	componentWillReceiveProps(nextProps){
		this.forceUpdate();
	}

	componentDidMount(){
		//initialize subscription here
		getContacts().then(results => {
			return results.json();
		}).then(data => {
			this.props.setContacts(data);
			this.setState({data: data});
		})
	};

	render() {
		var data = [];
		if (this.props.searchTerm.length > 0 ){
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
					onClick={() => {
						this.deleteContact(contact.ContactId);
					}}
				>
					<Delete />
				</IconButton>
			);
			const fullName = contact.ContactFirstName + " " + contact.ContactLastName;
			return( 
				<ListItem 
					key={contact.ContactId}
					primaryText={fullName}
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
					style={{
						margin: '0 auto',
						maxWidth: 800
					}}
					/>
				<div className="flex-container">
					<AddContact className="flex-item" />
					<RefreshButton className="flex-item" />
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
	filteredContacts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
	return {
		contact: state.selectedContact,
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading,
		contacts: state.allContacts,
		filteredContacts: state.allFilteredContacts,
		isEditMode: state.isEditMode,
		searchTerm: state.searchTerm
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setContact: (contact) => dispatch(setContact(contact)),
		setContacts: (contacts) => dispatch(setContacts(contacts)),
		setEditMode: (bool) => dispatch(setEditMode(bool)),
		setFilteredContacts: (contacts) => dispatch(setFilteredContacts(contacts))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);