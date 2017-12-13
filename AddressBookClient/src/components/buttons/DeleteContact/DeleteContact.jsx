import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class DeleteContact extends Component {
  render() {
    return (
      <div className="deleteContact">
        <FlatButton label="Delete"/>
      </div>
    );
  }
}

export default DeleteContact;
