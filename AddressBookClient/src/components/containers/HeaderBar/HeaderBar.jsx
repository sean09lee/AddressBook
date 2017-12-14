import React, {Component} from 'react';
import { dispatch, connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import AuthUtil from '../../../utilities/AuthUtil';
import DefaultAvatar from '../../../assets/default_avatar.jpg';
import { setUser } from '../../../utilities/Actions';
import './_headerBar.scss';

class HeaderBar extends Component {
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		AuthUtil.deauthenticateUser(this.props.user.UserId);
		this.props.setUser([]);
		this.props.history.push('/');
	}

	render(){
		var firstName = this.props.user.UsersFirstName
		var lastName = this.props.user.UsersLastName
		var title = this.props.user.UsersEmail;
		if (firstName && lastName)
		{
			title = firstName + " " + lastName;
		}

		return (
			<AppBar
				title={<span>{title}</span>}
				iconElementLeft={<Avatar src={DefaultAvatar} />}
				iconElementRight={<FlatButton label="Logout" onClick={this.logout} />}
			/>
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

export default connect(mapStateToProps,mapDispatchToProps)(HeaderBar);