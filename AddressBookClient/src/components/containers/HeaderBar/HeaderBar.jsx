import React, {Component} from 'react';
import { dispatch, connect } from 'react-redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
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
		this.state = {
			title: this.props.user.UsersEmail
		}
		this.logout = this.logout.bind(this);
	}
	
	componentWillReceiveProps(props){
		console.log(props);
	}

	componentWillMount(nextProps) {
		if (nextProps){
			var firstName = nextProps.user.UsersFirstName
			var lastName = nextProps.user.UsersLastName
			var title = nextProps.user.UsersEmail;
			if (firstName && lastName)
			{
				title = firstName + " " + lastName;
			}
			this.setState({
				title: title
			});
		}
	}

	logout() {
		AuthUtil.deauthenticateUser(this.props.user.UserId);
		this.props.setUser([]);
		this.props.history.push('/');
	}

	render(){


		return (
			<AppBar
				title={<span>{this.state.title}</span>}
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