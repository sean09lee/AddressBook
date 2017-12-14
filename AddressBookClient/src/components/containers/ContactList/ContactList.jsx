import React, { Component, PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { setContact, setContacts, setEditMode } from '../../../utilities/Actions';
import { getContacts } from '../../../services/ContactService';
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
	}

	deleteContact(contact){
		console.log('Deleting contact ' + contact.ContactFirstName + '...');
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
					onChange={() => console.log('onChange')}
					onRequestSearch={() => console.log('onRequestSearch')}
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
		isEditMode: state.isEditMode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setContact: (contact) => dispatch(setContact(contact)),
		setContacts: (contacts) => dispatch(setContacts(contacts)),
		setEditMode: (bool) => dispatch(setEditMode(bool))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);