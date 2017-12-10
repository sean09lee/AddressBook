import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import AuthUtil from '../../../utilities/AuthUtil';

function handleClick() {
  alert('onClick triggered on the title component');
}
 
const styles = {
  title: {
    cursor: 'pointer',
  },
};

export default class HeaderBar extends Component {
	constructor(props){
		super(props)
	}

	logout() {
		AuthUtil.deauthenticateUser();
		this.props.history.push('/');
	}

	render(){
		return (
			<AppBar
				title={<span style={styles.title}>Title</span>}
				onTitleClick={handleClick}
				iconElementLeft={<Avatar src="images/ok-404error.jpg" />}
				iconElementRight={<FlatButton label="Logout" />}
			/>
		);
	}
}