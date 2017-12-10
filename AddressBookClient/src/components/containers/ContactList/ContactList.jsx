import React, { Component } from 'react';
import TearSheet from '../TearSheet/TearSheet.jsx';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from 'material-ui-search-bar'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class ContactList extends Component {
	constructor(props){
		super(props)
		this.state = {
			requestFailed: false,
			contacts: [],
			contactDetails: []
		}
	}
	
	componentDidMount(){
		//initialize subscription here
		fetch('http://dev.addressbookservice.com/api/contacts')
		.then(results => {
			return results.json();
		}).then(data => {
			let contactList = data.map((contact) => {
				return( 
					<ListItem key={contact.ContactId}
						primaryText={contact.ContactFirstName + " " + contact.ContactLastName}
						leftAvatar={<Avatar src="images/ok-128.jpg" />}
						rightIcon={<CommunicationChatBubble />}
					/>
				)
			})
			this.setState({ contacts : contactList });
		});
	};

	componentWillUnmount(){
		//unsubscribe here
	}

	render() {
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
				<RaisedButton label="Add" primary={true} />
				<List>
					<Subheader>Contacts</Subheader>
					{this.state.contacts}
				</List>
				<Divider />
				<List>
					<Subheader>Recently added</Subheader>
					<ListItem
					primaryText="Chelsea Otakan"
					leftAvatar={<Avatar src="images/chexee-128.jpg" />}
					/>
					<ListItem
					primaryText="James Anderson"
					leftAvatar={<Avatar src="images/jsa-128.jpg" />}
					/>
				</List>
			</TearSheet>
		);
	}
}

export default ContactList;