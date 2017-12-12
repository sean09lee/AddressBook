import React, { Component, PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { itemsFetchData } from '../../../utilities/Actions'
import TearSheet from '../TearSheet/TearSheet.jsx';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from 'material-ui-search-bar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import DefaultAvatar from '../../../assets/default_avatar.jpg';

class ContactList extends Component {
	constructor(props){
		super(props)
		this.state = {
			requestFailed: false,
			contacts: []
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
					<ListItem 
						key={contact.ContactId}
						primaryText={contact.ContactFirstName + " " + contact.ContactLastName}
						leftAvatar={<Avatar src={DefaultAvatar} />}
						rightIcon={<CommunicationChatBubble />}
						onClick={() => this.props.fetchData(contact)}
					/>
				)
			})
			this.setState({ contacts : contactList });
		});
	};

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
    fetchData: PropTypes.func.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        contact: state.contact,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (contact) => dispatch(itemsFetchData(contact))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);