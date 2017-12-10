import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import AuthUtil from '../../../utilities/AuthUtil';
import './_logoutButton.scss';

class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    AuthUtil.deauthenticateUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="logoutButton">
        <RaisedButton label="Log out" onClick={this.logout} />
      </div>
    )
  }
}

export default withRouter(LogoutButton);
