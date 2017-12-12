import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import AuthUtil from '../../../utilities/AuthUtil';
import DefaultAvatar from '../../../assets/default_avatar.jpg';
 
const styles = {
  title: {
    cursor: 'pointer',
  },
};

export default class HeaderBar extends Component {
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		AuthUtil.deauthenticateUser();
		this.props.history.push('/');
	}

	render(){
		return (
			<AppBar
				title={<span style={styles.title}>Title</span>}
				iconElementLeft={<Avatar src={DefaultAvatar} />}
				iconElementRight={<FlatButton label="Logout" onClick={this.logout} />}
			/>
		);
	}
}