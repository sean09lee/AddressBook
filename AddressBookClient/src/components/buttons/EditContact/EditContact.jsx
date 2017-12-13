import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setEditMode } from '../../../utilities/Actions';
import ContactService from '../../../services/ContactService';
import FlatButton from 'material-ui/FlatButton';
import './_editContact.scss';

class EditContact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//editMode: this.props.editMode
		};

		this.handleSetEdit = this.handleSetEdit.bind(this);
	}

	handleSetEdit(){
		console.log('setting edit state');
		this.props.enableEdit(!this.props.editMode);
	}

	render() {
		return (
		<div className="editContact">
			<FlatButton label="Edit" onClick={this.handleSetEdit}  />
		</div>
		);
	}
}

EditContact.propTypes = {
	enableEdit: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		editMode: state.isEditMode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		enableEdit: (bool) => dispatch(setEditMode(bool))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
